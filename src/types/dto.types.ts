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

export interface RegisterProjectDTO {
  repoPath: string;
  id?: string,
  user_id?: string,
  owner?: string,
  name?: string,
  url?: string,
  stars?: number,
  forks?: number,
  issues?: number,
  create_date?: any
  createdBy?: string
}