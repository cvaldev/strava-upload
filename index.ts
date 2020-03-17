import * as express from "express";
import { Request, Response } from "express";
import { authService } from "./src/authorization";
import * as db from "./src/models";
import { authRouter, apiRouter } from "./src/routes";

const PORT = process.env.PORT || 8080;
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

(async () => {
    try {
        await db.init();

        app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
