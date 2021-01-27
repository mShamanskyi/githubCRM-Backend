import { UserData } from "entities.types";
import { RegisterUserDTO } from "DTO.types";
import { IdService, PWDServiceConstructable } from 'services.types';
import SystemError from '../system-errors/system-error';
import { UserErrorCodes } from '../system-errors/error-codes';

export default function CreateUser(Id: IdService, PasswordService: PWDServiceConstructable) {
  return class User {
    readonly passwordService = new PasswordService();
    readonly id: string;
    email: string;
    passwordHash: string;

    constructor({
      id,
      email,
      password,
      passwordHash
    }: UserData | RegisterUserDTO) {
      if (!id) {
        this.id = Id.makeId();
      } else {
        this.id = id;
      }
      this.email = email;

      if (!passwordHash && password) {
        this.passwordHash = this.hashPassword(password);
      } else {
        this.passwordHash = passwordHash;
      }
    }

    public static create(userData: UserData | RegisterUserDTO) {
      const { id, email, password, passwordHash } = userData;

      if (id && !Id.isValidId(id)) {
        return new SystemError("Invalid id", UserErrorCodes.VALIDATION);
      }

      if (!email) {
        return new SystemError("email is required field", UserErrorCodes.VALIDATION);
      }
      
      if (!password && !passwordHash) {
        return new SystemError("password is required field", UserErrorCodes.VALIDATION);
      }

      return new User(userData);
    }

    hashPassword(password: string): string {
      return this.passwordService.hashPassword(password);
    }

    comparePassword(password: string): boolean {
      return this.passwordService.comparePasswords(password, this.passwordHash);
    }

    getId() {
      return this.id;
    }

    getEmail() {
      return this.email;
    }

    getPasswordHash() {
      return this.passwordHash;
    }

    setEmail(email: string) {
      if (!email || typeof email !== 'string') {
        return new SystemError("Email is invalid.", UserErrorCodes.VALIDATION);
      }

      this.email = email;
    }

    toObject() {
      return {
        id: this.getId(),
        email: this.getEmail(),
        passwordHash: this.getPasswordHash()
      };
    }
  };
}