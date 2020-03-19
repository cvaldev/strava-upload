import { Request, Response } from "express";
import { authService } from "../authorization";
import { extname } from "path";
import * as express from "express";
import { uploadFile, upload } from "../utils";
/**
 * API access points
 */

export const router = express.Router();

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

        console.log(`${id} sending ${file}`);
        const [payload, error] = await uploadFile(accessToken, dataType, file);

        if (!error) {
            return res.json(payload);
        } else {
            return res.status(error.statusCode).json(error);
        }
    }
);
