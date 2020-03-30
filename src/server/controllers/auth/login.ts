import { Request, Response, NextFunction } from "express";
import authService from "../../../authorization";

const login = (req: Request, res: Response, next: NextFunction) => {
    const state = req.query?.state;
    return authService.login(state)(req, res, next);
};

export default login;
