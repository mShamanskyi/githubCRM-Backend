import JWTService from '../services/token-service';

import CreateLoginUser from './user/login-user';
import CreateRegisterUser from './user/register-user';

import CreateGetUserProjects from './project/get-project-list';
import CreateRegisterProject from './project/register-projects';

const LoginUser = CreateLoginUser(JWTService);
const RegisterUser = CreateRegisterUser();
const GetUserProjects = CreateGetUserProjects();
const RegisterProject = CreateRegisterProject();

export {
  LoginUser,
  RegisterUser,
  GetUserProjects,
  RegisterProject
};