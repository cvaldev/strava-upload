import { Logger, getLogger, shutdown } from "log4js";
import { join } from "path";

export default class LogService {
    public static base: string;
    private _logger: Logger;
    private _logPath: string;

    // Shuts down all LogServices, do not use...
    public static shutDown() {
        return new Promise((resolve, reject) => {
            shutdown((error) => (error ? reject(error) : resolve()));
        });
    }

    constructor(name: string) {
        this._logPath = join(LogService.base, `${name}.log`);
        this._logger = getLogger(name);
    }

    public get logPath(): string {
        return this._logPath;
    }
    public get logger(): Logger {
        return this._logger;
    }
}
