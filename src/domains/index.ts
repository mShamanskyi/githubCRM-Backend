import Id from '../services/id-service';
import PasswordService from '../services/password-service';

import CreateUser from './user';
import CreateProject from './project';

const User = CreateUser(Id, PasswordService);
const Project = CreateProject(Id);

export {
  User,
  Project
};