import LogService from "./logService";
import { configure } from "log4js";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { configuration } from "../configuration/configuration";

const root = process.cwd();
LogService.base = join(root, "logs");

if (configuration.env !== "test") {
    if (!existsSync(LogService.base)) {
        try {
            mkdirSync(LogService.base);
        } catch (e) {
            console.log(e);
        }
    }
    configure({
        appenders: {
            multi: {
                type: "multiFile",
                base: LogService.base,
                property: "categoryName",
                extension: ".log"
            },
            err: {
                type: "stderr"
            }
        },
        categories: {
            default: {
                appenders: ["multi"],
                level: "debug"
            },
            err: { appenders: ["err"], level: "error", enableCallStack: true }
        }
    });
}

export const errLogger = new LogService("err").logger;
export default LogService;
