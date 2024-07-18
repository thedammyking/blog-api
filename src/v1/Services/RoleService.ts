import { User } from '@supabase/supabase-js';

import { PAGINATION_DEFAULT } from '@/data/constants';
import { insertRoleSchema, updateRoleSchema } from '@/db/schema';
import CreatingFailedError from '@/errors/CreatingFailedError';
import DeletingFailedError from '@/errors/DeletingFailedError';
import RecordNotFoundError from '@/errors/RecordNotFoundError';
import ResourceExistsError from '@/errors/ResourceExistsError';
import UpdatingFailedError from '@/errors/UpdatingFailedError';
import { CreateRoleData, Role } from '@/types/entities/role';
import { PaginatationQuery } from '@/types/generics';
import RoleRepository from '@/v1/Repositories/RoleRepository';

import Service from './Service';

export default class RoleService extends Service<RoleRepository> {
  constructor() {
    super(new RoleRepository());
  }

  async createRole(data: CreateRoleData) {
    await insertRoleSchema.parse(data);

    let newRole: Role[];

    const existingRole = await this.repository.getByValue(data.value);

    if (existingRole && existingRole.deletedAt)
      newRole = await this.repository.undelete(existingRole.id);

    if (existingRole && !existingRole.deletedAt)
      throw new ResourceExistsError({ message: 'Role exists already' });

    newRole = await this.repository.create(data);

    if (!newRole) throw new CreatingFailedError({ message: 'Failed to create role' });

    return newRole;
  }

  async getRoles(user: User | null, paginatationQuery: Partial<PaginatationQuery>) {
    const paginatation = { ...PAGINATION_DEFAULT, ...paginatationQuery };
    const data = await this.repository.getAllRoles(
      paginatation,
      user?.user_metadata?.role?.accessor || 0
    );
    const count = await this.repository.getTotal();
    if (!data) throw new RecordNotFoundError({ message: 'No roles found' });
    return {
      data,
      meta: {
        paginatation: this.generatePaginationMeta(count[0], paginatation)
      }
    };
  }

  async getRoleById(id: string, user: User | null) {
    const role = await this.repository.getByRoleId(id, user?.user_metadata?.role?.accessor || 0);
    if (!role) throw new RecordNotFoundError({ message: 'Role not found' });
    return role;
  }

  async updateRole(id: string, data: Partial<CreateRoleData>) {
    await updateRoleSchema.parse(data);
    const role = await this.repository.update(id, data);
    if (!role) throw new UpdatingFailedError({ message: 'Failed to update role' });
    return role;
  }

  async deleteRole(id: string) {
    const role = await this.repository.delete(id);
    if (!role) throw new DeletingFailedError({ message: 'Failed to delete role' });
    return role;
  }
}
