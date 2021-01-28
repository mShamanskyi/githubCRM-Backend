import { ErrorCodes } from './error-codes';
export default class SystemError extends Error {
  errorCode: ErrorCodes;
  constructor(message: string, errorCode: ErrorCodes) {
    super(message);
    this.name = 'SystemError';
    this.errorCode = errorCode;
  }
}