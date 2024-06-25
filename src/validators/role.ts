import { z } from 'zod';

export const createRoleDataValidator = z
  .object({
    label: z.string(),
    value: z.string()
  })
  .required();

export const updateRoleDataValidator = z
  .object({
    label: z.string().optional(),
    value: z.string().optional()
  })
  .required();

export const roleDataValidator = z
  .object({
    label: z.string(),
    value: z.string(),
    id: z.string()
  })
  .required();