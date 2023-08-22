export type UserRoles = "owner" | "employee" | "resident";

export interface LoginArgs {
  email: string;
  password: string;
}

export interface SignUpArgs extends LoginArgs {
  name: string;
}

export interface User extends SignUpArgs {
  id: number;
}

export interface OnBoardArgs extends SignUpArgs {
  organization: string;
}

export interface UserFromInvite extends SignUpArgs {
  role: UserRoles;
  organization_id: number;
}
