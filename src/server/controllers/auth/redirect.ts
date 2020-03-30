import { Request, Response } from "express";

const redirect = (req: Request, res: Response) => res.redirect("/");
export default redirect;
