import SystemError from '../system-errors/system-error';
import { ProjectData } from 'entities.types';

export interface TokenService {
  releaseToken: (data: any) => string;
  verifyToken: (token: string) => any;
  decodeToken: (token: string) => any | SystemError;
}

export interface GithubService {
  fetchRepoInformation: (repoPath: string) => Promise<ProjectData | SystemError>
}

export interface GithubServiceConstructable {
  new(): GithubService;
}

export interface PWDService {
  hashPassword: (password: string) => string;
  comparePasswords: (password: string, passwordHash: string) => boolean;
}

export interface TokenServiceConstructable {
  new(): TokenService;
}

export interface PWDServiceConstructable {
  new(): PWDService;
}

export interface IdService {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}