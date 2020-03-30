import { Request, Response, NextFunction } from "express";
import { upload } from "../../../utils";

const saveTempFiles = (req: Request, res: Response, next: NextFunction) => {
    return upload().array("file", 25)(req, res, next);
};

export default saveTempFiles;
