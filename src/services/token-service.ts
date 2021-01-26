import jwt from 'jsonwebtoken';
import { TokenService } from 'services.types';
import SystemError from '../system-errors/system-error';
import { ServiceErrorCodes } from '../system-errors/error-codes';

export default class JWTService implements TokenService {
  private SECRET = process.env.JWT_SECRET;
  private EXPIRES_IN = process.env.JWT_EXPIRES_IN;

  releaseToken(data: any) {
    return jwt.sign(data, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.SECRET);
    } catch (err) {
      return new SystemError('Invalid JWT token', ServiceErrorCodes.JWT_INVALID_TOKEN);
    }
  }

  decodeToken(token: string) {
    try {
      return jwt.decode(token);
    } catch (e) {
      return new SystemError('Invalid JWT token signature', ServiceErrorCodes.JWT_INVALID_TOKEN_SIGNATURE);
    }
  }
}