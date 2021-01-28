import { DeleteProject } from '../../use-cases';
import { HttpRequest, HttpResponse, StatusCode } from "http-controller.types";
import { logger } from "../../services/logger";
import SystemError from '../../system-errors/system-error';
import { ProjectDeleteErrors, ServiceErrorCodes } from '../../system-errors/error-codes';

const useCase = new DeleteProject();

export default async function deleteBusiness(httpRequest: HttpRequest): Promise<HttpResponse> {
  try {

    const result = await useCase.execute(httpRequest.params.id, httpRequest.locals.user);

    if (result instanceof SystemError) {
      let statusCode: StatusCode;

      switch (result.errorCode) {
        case ProjectDeleteErrors.FORBIDDEN:
          statusCode = 403;
          break;
        case ProjectDeleteErrors.NOTFOUND:
          statusCode = 404;
          break;

        case ServiceErrorCodes.INTERNAL:
          statusCode = 500;
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