import type { UserRole } from "@prisma/client";

export interface Role {
  id: number;
  user_id: number;
  organization_id: number;
  role: UserRole;
}

export interface ICreateRole {
  user_id: number;
  role: UserRole;
  organization_id: number;
}
