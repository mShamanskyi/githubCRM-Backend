import { User } from "../../domains";
import { UseCase } from "use-cases.types";
import { RegisterUserDTO } from "DTO.types";
import { UserData } from "entities.types";

import SystemError from '../../system-errors/system-error';
import UserDataBase from '../../db/user-db';
import { UserErrorCodes } from '../../system-errors/error-codes';

export default function CreateRegisterUser() {

  return class RegisterUser implements UseCase {
    async execute(data: RegisterUserDTO): Promise<UserData | Error> {
      const existedUserWithEmail = await UserDataBase.findByEmail(data.email);

      if (existedUserWithEmail && existedUserWithEmail.length) {
        return new SystemError('An user with this email already existed', UserErrorCodes.EXISTED);
      }

      const user = User.create(data);

      if (!(user instanceof User)) {
        return user;
      }

      await UserDataBase.insertUser(user.toObject());
      
      return user.toObject();
    }
  }
}