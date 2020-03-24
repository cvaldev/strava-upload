import { Request, Response } from "express";
import authService from "../../authorization";
import { extname } from "path";
import express from "express";
import { uploadFile, upload } from "../../utils";
import { IUser } from "../../interfaces";
import { logger, errLogger } from "../../logger";

/**
 * API access points
 */

const router = express.Router();

router.post(
    "/upload",
    authService.ensureAuthorized,
    authService.refreshToken,
    upload().single("file"),
    async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                error: "BAD REQUEST",
                message: { file: "no file in request" }
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

export default router;
