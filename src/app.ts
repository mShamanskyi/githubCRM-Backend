import dotenv from "dotenv";
dotenv.config(); // process.env should contains variables until any import
import http from "http";
import express from "express";
import makeCallback from "./express-callback";
import cors from 'cors';

import { logger } from './services/logger';

import {
  notFound
} from "./controllers";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3001);
app.set("env", process.env.NODE_ENV);
app.disable("x-powered-by");

app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

// Not Found
app.use(makeCallback(notFound));

const server = http.createServer(app);

server.listen(app.get("port"), () => {
  logger.info(`API listening on port ${app.get("port")}`);
});

server.on("error", error => {
  logger.error(error);
});