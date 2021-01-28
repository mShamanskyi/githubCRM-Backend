import CreateAuthorization from './authorization';
import JWTService from '../services/token-service';

const authorization = CreateAuthorization(JWTService);

export {
  authorization
}