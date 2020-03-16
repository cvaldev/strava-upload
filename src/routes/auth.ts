import { Request, Response, NextFunction } from "express";
import { authService } from "../authorization";
import * as express from "express";

/**
 * Authentication access points.
 */

export const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const { response_url } = req.query;
    return authService.login(response_url)(req, res, next);
});

router.get(
    "/redirect",
    authService.verifyRedirect(),
    authService.handleRedirect,
    (req: Request, res: Response) => {
        res.send("You may close this tab!");
    }
);
