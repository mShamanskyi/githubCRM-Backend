export enum AuthErrorCodes {
  NOTFOUND = 'NOT_FOUND',
  INVALID_PWD = 'INVALID_PASSWORD',
  VALIDATION = 'INVALID_VALUE',
  INVALID_TOKEN = 'INVALID_TOKEN'
}

export enum ServiceErrorCodes {
  JWT_INVALID_TOKEN= 'JWT_INVALID_TOKEN',
  JWT_INVALID_TOKEN_SIGNATURE = 'JWT_INVALID_TOKEN_SIGNATURE',
  INTERNAL= 'INTERNAL ERROR',
}

export enum UserErrorCodes {
  EXISTED= 'EXISTED_EMAIL',
  VALIDATION= 'INVALID_VALUE',
  NOTFOUND= 'EMAIL_NOT_FOUND'
}

export type ErrorCodes =
  AuthErrorCodes |
  ServiceErrorCodes |
  UserErrorCodes;