export interface LoginArgs {
  email: string;
  password: string;
}

export interface SignInArgs extends LoginArgs {
  name: string;
}

export interface User extends SignInArgs {
  id: number;
}
