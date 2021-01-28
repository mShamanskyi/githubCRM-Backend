import JWTService from '../services/token-service';

import CreateLoginUser from './user/login-user';
import CreateRegisterUser from './user/register-user';

import CreateGetUserProjects from './project/get-project-list';
import CreateRegisterProject from './project/register-projects';
import CreateDeleteProject from './project/delete-project';
import CreateUpdateProject from './project/update-project';

const LoginUser = CreateLoginUser(JWTService);
const RegisterUser = CreateRegisterUser();
const GetUserProjects = CreateGetUserProjects();
const RegisterProject = CreateRegisterProject();
const DeleteProject = CreateDeleteProject();
const UpdateProject = CreateUpdateProject();

export {
  DeleteProject,
  LoginUser,
  RegisterUser,
  GetUserProjects,
  RegisterProject,
  UpdateProject
};