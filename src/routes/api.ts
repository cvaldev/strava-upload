import { Request, Response } from "express";
import { FileFilterCallback } from "multer";
import { authService } from "../authorization";
import { extname } from "path";
import { unlink } from "fs";
import { tmpdir } from "os";
import * as strava from "strava-v3";
import * as express from "express";
import * as multer from "multer";

/**
 * API access points
 */

export const router = express.Router();
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => (extname(file.originalname) == ".FIT" ? cb(null, true) : cb(null, false));

const upload = multer({ dest: tmpdir(), fileFilter: fileFilter });

const deleteTempFile = (file: string) => {
    unlink(file, (e) => {
        if (e) console.log(e);
        console.log(`${file} deleted`);
    });
};

const handleFileUpload = async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({
            error: "BAD REQUEST",
            message: { file: req.file }
        });
        return;
    }

    const { accessToken, id, refreshToken } = <IUser>req.user;
    const { path: file, originalname } = req.file;
    const dataType = extname(originalname).replace(".", "");
    try {
        console.log(`Sending ${file} to strava ${id}`);

        // @ts-ignore: property `uploads` does not exist
        // Why did I ever think using TS was a good idea???
        const payload = await strava.uploads.post(
            {
                access_token: accessToken,
                data_type: dataType,
                file: file
            },
            () => deleteTempFile(file)
        );

        res.json(payload);
    } catch (e) {
        res.status(e.statusCode).json(e.error);
    }
};

router.post(
    "/upload",
    authService.ensureAuthorized,
    // authService.refreshToken,
    upload.single("file"),
    handleFileUpload
);
