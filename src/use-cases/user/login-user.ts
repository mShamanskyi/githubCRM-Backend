import { UseCase } from "use-cases.types";
import { LoginUserDTO } from "DTO.types";
import SystemError from '../../system-errors/system-error';
import { TokenServiceConstructable } from 'services.types';
import { LoginResponse } from 'response.types';
import { AuthErrorCodes } from '../../system-errors/error-codes';

export default function CreateLoginUser(JWTService: TokenServiceConstructable) {
  const jwtService = new JWTService();

  return class LoginUser implements UseCase {
    async execute(data: LoginUserDTO): Promise<LoginResponse | SystemError> {
      if (!(data.email && data.password)) {
        return new SystemError('Email and password are required fields', AuthErrorCodes.VALIDATION);
      }
      //HERE WILL BE CODE!!!

      return {
        token: 'token!'
      }
    }
  }
}