import SystemError  from '../system-errors/system-error';

export interface TokenService {
  releaseToken: (data: any) => string;
  verifyToken: (token: string) => any;
  decodeToken: (token: string) => any | SystemError;
}

export interface TokenServiceConstructable {
  new(): TokenService;
}