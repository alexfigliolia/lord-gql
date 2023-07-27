export type UserRoles = "owner" | "employee" | "tenant";

export interface LoginArgs {
  email: string;
  password: string;
}

export interface SignUpArgs extends LoginArgs {
  name: string;
  role: UserRoles;
}

export interface User extends SignUpArgs {
  id: number;
}
