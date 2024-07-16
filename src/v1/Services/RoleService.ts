import { User } from '@supabase/supabase-js';

import { PAGINATION_DEFAULT } from '@/data/constants';
import { insertRoleSchema, updateRoleSchema } from '@/db/schema';
import APIError from '@/lib/error';
import { generatePaginationMeta } from '@/lib/utils';
import { CreateRoleData } from '@/types/entities/role';
import { PaginatationQuery } from '@/types/generics';
import RoleRepository from '@/v1/Repositories/RoleRepository';

class RoleService {
  private repository = new RoleRepository();

  async createRole(data: CreateRoleData) {
    await insertRoleSchema.parse(data);
    const role = await this.repository.create(data);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to create role' });
    return role;
  }

  async getRoles(user: User | null, paginatationQuery: Partial<PaginatationQuery>) {
    const paginatation = { ...PAGINATION_DEFAULT, ...paginatationQuery };
    const [data, count] = await this.repository.getAll(
      paginatation,
      user?.user_metadata?.role?.accessor || 0
    );
    if (!data) throw new APIError({ statusCode: 404, message: 'No roles found' });
    return {
      data,
      meta: {
        paginatation: generatePaginationMeta(count[0], paginatation)
      }
    };
  }

  async getRoleById(id: string, user: User | null) {
    const role = await this.repository.getById(id, user?.user_metadata?.role?.accessor || 0);
    if (!role) throw new APIError({ statusCode: 404, message: 'Role not found' });
    return role;
  }

  async updateRole(id: string, data: Partial<CreateRoleData>) {
    await updateRoleSchema.parse(data);
    const role = await this.repository.update(id, data);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to update role' });
    return role;
  }

  async deleteRole(id: string) {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    const role = await this.repository.delete(id);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to delete role' });
    return role;
  }
}

export default RoleService;
