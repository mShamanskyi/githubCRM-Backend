export interface UserData {
  id: string;
  email: string;
  passwordHash: string;
  password?: undefined;
}

export interface ProjectData {
  id: string,
  user_id: string,
  owner: string,
  name: string,
  url: string,
  stars: number,
  forks: number,
  issues: number,
  create_date: any
}