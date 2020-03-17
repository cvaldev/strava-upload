import * as express from "express";
import { Request, Response } from "express";
import { authService } from "./src/authorization";
import { authRouter, apiRouter } from "./src/routes";

const app = express();

app.use(express.static("public"));
app.use(authService.middleware);
app.use("/oauth/strava", authRouter);
app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => res.send("Coming soon!"));

app.post(
    "/test",
    authService.ensureAuthorized,
    authService.refreshToken,
    (req, res) => {
        res.send(req.user);
    }
);

export default app;
