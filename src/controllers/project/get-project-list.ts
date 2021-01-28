import { HttpRequest, HttpResponse } from "http-controller.types";
import { logger } from "../../services/logger";
import { GetUserProjects } from '../../use-cases';

const useCase = new GetUserProjects();

export default async function getProjectList(httpRequest: HttpRequest): Promise<HttpResponse> {
  try {

    const result = await useCase.execute(httpRequest.locals.user.id);

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