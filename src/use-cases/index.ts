import JWTService from '../services/token-service';
import CreateLoginUser from './user/login-user';

const LoginUser = CreateLoginUser(JWTService);

export {
  LoginUser
};