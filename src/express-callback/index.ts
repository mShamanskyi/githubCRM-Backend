import { Request, Response } from "express";
import { Controller, HttpRequest } from "http-controller.types.ts";
import { logger } from "../services/logger";

export default function makeExpressCallback(controller: Controller) {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      files: req.files || {},
      query: req.query || {},
      params: req.params || {},
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent")
      },
      locals: res.locals
    };

    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(e => {
        res.status(500).send({ error: "An unkown error occurred." });
        logger.error(e);
      });
  };
}