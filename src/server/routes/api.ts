import { Request, Response } from "express";
import { authService } from "../../authorization/authorization";
import { extname } from "path";
import express from "express";
import { uploadFile, upload } from "../../utils/utils";
import { IUser } from "../models/IUser";
import LogService, { errLogger } from "../../logger/logger";

/**
 * API access points
 */

export const router = express.Router();
const logger = new LogService("api").logger;

router.post(
    "/upload",
    authService.ensureAuthorized,
    authService.refreshToken,
    upload().single("file"),
    async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                error: "BAD REQUEST",
                message: { file: req.file }
            });
        }
        const { accessToken, id } = <IUser>req.user;
        const { path: file, originalname } = req.file;
        const dataType = extname(originalname).replace(".", "");

        logger.debug(`${id} sending ${file}`);
        const [payload, error] = await uploadFile(accessToken, dataType, file);

        if (!error) {
            return res.json(payload);
        } else {
            errLogger.error(`Failed to upload file! ${error}`);
            return res.status(error.statusCode).json(error);
        }
    }
);
