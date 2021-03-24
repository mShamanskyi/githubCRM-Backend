import { HttpResponse } from "http-controller.types";

export default async function healthCheck(): Promise<HttpResponse> {
  return Promise.resolve({
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      result:
        "API connection is opened. You can send request to the existing routes",
      error: null,
    },
    statusCode: 200,
  });
}