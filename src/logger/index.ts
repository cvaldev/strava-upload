import LogService from "./logService";
import { configure } from "log4js";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
LogService.base = join(root, "logs");

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
        }
    },
    categories: { default: { appenders: ["multi"], level: "debug" } }
});

export default LogService;
