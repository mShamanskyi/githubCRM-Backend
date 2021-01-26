import { LoginUser } from "../../use-cases";
import { HttpRequest, HttpResponse, StatusCode } from "http-controller.types";
import { logger } from "../../services/logger";
import SystemError from '../../system-errors/system-error';
import { AuthErrorCodes } from '../../system-errors/error-codes';

const useCase = new LoginUser();

export default async function loginUser(httpRequest: HttpRequest): Promise<HttpResponse> {
  try {
    const result = await useCase.execute(httpRequest.body);

    if (result instanceof SystemError) {
      let statusCode: StatusCode = 400;

      switch (result.errorCode) {
        case AuthErrorCodes.NOTFOUND:
          statusCode = 404;
          break;
        case AuthErrorCodes.VALIDATION:
          statusCode = 400;
          break;
        case AuthErrorCodes.INVALID_PWD:
          statusCode = 401;
          break;
        case AuthErrorCodes.UNVERIFIED_USER:
          statusCode = 403;
      }

      return {
        headers: {
          "Content-Type": "application/json"
        },
        body: { error: result.message },
        statusCode: statusCode
      };
    }
    return {
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        result: result,
        error: null
      },
      statusCode: 200
    };
  } catch (err) {
    logger.error(err);

    return {
      headers: {
        "Content-Type": "application/json"
      },
      body: { error: "Internal Server Error." },
      statusCode: 500
    };
  }
}