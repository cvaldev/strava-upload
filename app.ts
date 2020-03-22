import express from "express";
import next from "next";
import { Request, Response } from "express";
import { authService } from "./src/authorization";
import { authRouter, apiRouter } from "./src/routes";
import { configuration } from "./src/configuration/configuration";

const dev = configuration.env !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(express.static("public"));
    server.use(authService.middleware);
    server.use("/oauth/strava", authRouter);
    server.use("/api", apiRouter);

    server.get("*", (req: Request, res: Response) => handle(req, res));

    server.listen(8080, (err) => {
        if (err) throw err;
        console.log(`Server listening on 8080`);
    });
});

// export default app;
