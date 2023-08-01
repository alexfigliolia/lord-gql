import type { UserFromInvite } from "resolvers/authentication/types";
import type { UserRole } from "resolvers/user/types";

export interface InviteArgs {
  email?: string;
  organization_id?: number;
}

export interface IInvite {
  name: string;
  email: string;
  role: UserRole;
  organization_id: number;
  organization_name: string;
}

export interface AccountFromInvite extends UserFromInvite {
  invite_id: number;
}
