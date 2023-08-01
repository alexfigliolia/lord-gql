export interface UserArgs {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export enum UserRole {
  owner = "owner",
  employee = "employee",
  resident = "resident",
}
