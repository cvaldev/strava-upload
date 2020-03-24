import { Request, Response, NextFunction } from "express";
import authService from "../../authorization";
import express from "express";

/**
 * Authentication access points.
 */

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const state = req.query?.state;
    return authService.login(state)(req, res, next);
});

router.get(
    "/redirect",
    authService.verifyRedirect,
    authService.handleRedirect,
    (req: Request, res: Response) => res.redirect("/")
);

export default router;
