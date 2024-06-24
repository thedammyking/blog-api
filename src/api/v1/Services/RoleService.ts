import { User } from '@supabase/supabase-js';
import RoleRepository from '@v1/Repositories/RoleRepository';

import { ROLES_ACCESSIBLE_TO_UNAUTHENTICATED } from '@/data/constants';
import APIError from '@/lib/error';
import { CreateRoleData, Roles } from '@/types/entities/role';
import { createRoleDataValidator, updateRoleDataValidator } from '@/validators/services';

class RoleService {
  private repository = new RoleRepository();

  async createRole(data: CreateRoleData) {
    await createRoleDataValidator.parse(data);
    const role = await this.repository.create(data);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to create role' });
    return role;
  }

  async getRoles(user: User | null) {
    const roles = await this.repository.getAll();
    if (!roles) throw new APIError({ statusCode: 404, message: 'No roles found' });
    if (!user || user.user_metadata.role.value !== Roles.SuperAdmin)
      return roles.filter(
        role => role.value && ROLES_ACCESSIBLE_TO_UNAUTHENTICATED.includes(role.value as Roles)
      );
    return roles;
  }

  async getRoleById(id: string, user: User | null) {
    const role = await this.repository.getById(id);
    if (!role) throw new APIError({ statusCode: 404, message: 'Role not found' });
    if (
      (!user || user.user_metadata.role.value !== Roles.SuperAdmin) &&
      role.value &&
      !ROLES_ACCESSIBLE_TO_UNAUTHENTICATED.includes(role.value as Roles)
    )
      throw new APIError({ statusCode: 401, message: 'Not authorized to view this role' });
    return role;
  }

  async updateRole(id: string, data: Partial<CreateRoleData>) {
    await updateRoleDataValidator.parse(data);
    const role = await this.repository.update(id, data);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to update role' });
    return role;
  }

  async deleteRole(id: string) {
    const role = await this.repository.delete(id);
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to delete role' });
    return role;
  }
}

export default RoleService;
