import LogService from "./LogService";
import { configure } from "log4js";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import configuration from "../configuration";

const root = process.cwd();
LogService.base = join(root, "logs");

if (configuration.env !== "test") {
    configure({
        appenders: {
            server: {
                type: "stdout"
            },
            err: {
                type: "stderr"
            }
        },
        categories: {
            default: {
                appenders: ["server"],
                level: "debug"
            },
            err: { appenders: ["err"], level: "error", enableCallStack: true }
        }
    });
}

export const logger = new LogService("server").logger;
export const errLogger = new LogService("err").logger;
export default LogService;
