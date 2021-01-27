import { UseCase } from "use-cases.types";
import { LoginUserDTO } from "DTO.types";
import { TokenServiceConstructable } from 'services.types';
import { LoginResponse } from 'response.types';

import { User } from '../../domains';

import SystemError from '../../system-errors/system-error';
import UserDataBase from '../../db/user-db';
import { AuthErrorCodes } from '../../system-errors/error-codes';
import { UserData } from "entities.types";

export default function CreateLoginUser(JWTService: TokenServiceConstructable) {
  const jwtService = new JWTService();
  return class LoginUser implements UseCase {
    async execute(data: LoginUserDTO): Promise<LoginResponse | SystemError> {
      if (!(data.email && data.password)) {
        return new SystemError('Email and password are required fields', AuthErrorCodes.VALIDATION);
      }

      const existedUserWithEmail = await UserDataBase.findByEmail(data.email);

      if (!existedUserWithEmail || !existedUserWithEmail.length) {
        return new SystemError(`There is no user with email ${data.email}`, AuthErrorCodes.NOTFOUND);
      }

      const user = User.create({
        ...existedUserWithEmail[0],
        passwordHash: existedUserWithEmail[0].password_hash
      });

      if (user instanceof SystemError) {
        return user;
      }

      const isPasswordEqual = user.comparePassword(data.password);

      if (!isPasswordEqual) {
        return new SystemError('Invalid password', AuthErrorCodes.INVALID_PWD)
      }

      const token = jwtService.releaseToken({
        email: user.getEmail(),
        id: user.getId()
      });

      return {
        token
      }
    }
  }
}