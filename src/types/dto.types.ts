export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface RegisterUserDTO {
  id: undefined;
  email: string;
  password: string;
  passwordHash: undefined;
}