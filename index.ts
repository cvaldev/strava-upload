import next from "next";
import server from "./src/server";
import { errLogger } from "./src/logger";
import { Request, Response } from "express";
import { init } from "./src/server/models";
import { configuration } from "./src/configuration/configuration";

const PORT = process.env.PORT || 8080;
const dev = configuration.env !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
    try {
        await init();
        await app.prepare();

        server.get("*", (req: Request, res: Response) => handle(req, res));
        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (error) {
        errLogger.error(error);
        throw error;
    }
})();
