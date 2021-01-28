import { TokenServiceConstructable } from 'services.types';
import { Request, Response, NextFunction } from 'express';
import SystemError from '../system-errors/system-error';

export default function CreateAuthorization(JWTService: TokenServiceConstructable) {
  const jwtService = new JWTService();

  return function (req: Request, res: Response, next: NextFunction) {
    let token = req.get("Authorization");

    token = token ? token.replace("Bearer ", "") : null;

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwtService.verifyToken(token);

    if (decoded instanceof SystemError) {
      return res.sendStatus(401);
    }

    res.locals.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  }
}