import Id from '../services/id-service';
import PasswordService from '../services/password-service';

import CreateUser from './user';

const User = CreateUser(Id, PasswordService);

export {
  User
};