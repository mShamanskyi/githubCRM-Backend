import { HttpResponse } from "http-controller.types";

export default async function notFound (): Promise<HttpResponse> {
  return Promise.resolve({
    headers: {
      "Content-Type": "application/json"
    },
    body: { error: "Route is not found." },
    statusCode: 404
  });
}