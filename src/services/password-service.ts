import bcrypt from 'bcrypt';
import { PWDService } from 'services.types';

export default class PasswordService implements PWDService {
  private SALT_LEN = 10;

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(this.SALT_LEN));
  }

  comparePasswords(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }
}