export interface Role {
  label: string;
  value: Roles;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface CreateRoleData {
  label: string;
  value: string;
}

export enum Roles {
  Editor = 'editor',
  SuperAdmin = 'super-admin',
  Reader = 'reader'
}
