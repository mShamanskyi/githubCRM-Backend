import * as fs from "fs";
import * as path from "path";
import Logger, { Stream } from "bunyan";
import PrettyStream from "bunyan-prettystream";

const environment = process.env.NODE_ENV;
const prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

const stream: Stream[] = [];

if (environment === "production") {
  const logsDir = process.env.LOG_DIR;

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  if (!fs.existsSync(path.join(logsDir, environment))) {
    fs.mkdirSync(path.join(logsDir, environment));
  }

  stream.push({
    level: "info",
    path: path.join(logsDir, environment, "log.json"),
    type: "rotating-file",
    period: "1d",
    count: 3
  });
} else if (environment === "development") {
  stream.push({
    level: "trace",
    type: "raw",
    stream: prettyStdOut
  });
} else {
  stream.push({
    level: "fatal",
    type: "raw",
    stream: prettyStdOut
  });
}

export const logger = Logger.createLogger({name: "crm-github", streams: stream, src: environment === "development"});