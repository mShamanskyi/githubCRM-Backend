import JWTService from '../services/token-service';
import CreateLoginUser from './user/login-user';
import CreateRegisterUser from './user/register-user';

const LoginUser = CreateLoginUser(JWTService);
const RegisterUser = CreateRegisterUser();

export {
  LoginUser,
  RegisterUser
};