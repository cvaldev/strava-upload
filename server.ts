import express from "express";
import next from "next";
import { init } from "./src/models/models";
import { Request, Response } from "express";
import { authService } from "./src/authorization";
import { authRouter, apiRouter } from "./src/routes";
import { configuration } from "./src/configuration/configuration";
import LogService, { errLogger } from "./src/logger";

const PORT = process.env.PORT || 8080;
const dev = configuration.env !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
    try {
        await init();
        await app.prepare();
        const server = express();

        server.use(express.static("public"));
        server.use(authService.middleware);
        server.use("/oauth/strava", authRouter);
        server.use("/api", apiRouter);

        server.get("*", (req: Request, res: Response) => handle(req, res));

        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (error) {
        errLogger.error(error);
        await LogService.shutDown();
        throw error;
    }
})();
