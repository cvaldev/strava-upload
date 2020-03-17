import { Request, Response } from "express";
import { FileFilterCallback } from "multer";
import { authService } from "../authorization";
import { join, extname } from "path";
import { unlink } from "fs";
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

const upload = multer({ dest: "uploads/", fileFilter: fileFilter });

const handleFileUpload = async (req: Request, res: Response, next) => {
    if (!req.file) {
        res.status(400).json({
            error: "BAD REQUEST",
            message: { file: req.file }
        });
        return;
    }
    const { accessToken, id } = <IUser>req.user;
    console.log(`Processing file for ${id}`);

    const { path, originalname } = req.file;
    const file = join(__dirname, path);
    const dataType = extname(originalname).replace(".", "");

    console.log(`Sending ${file} to strava ${id}`);

    // @ts-ignore: property `uploads` does not exist
    // Why did I ever think using TS was a good idea???
    const response = await strava.uploads.post(
        {
            access_token: accessToken,
            data_type: dataType,
            file: file
        },
        (err, payload) => {
            // TODO: remove this....
            if (err) console.log(err);
        }
    );

    // Delete the temp file.
    unlink(file, (e) => {
        if (e) console.log(e);
        console.log(`${file} deleted`);
    });

    // res.json(response);
    next();
};

router.post(
    "/upload",
    authService.ensureAuthorized,
    authService.refreshToken,
    upload.single("file"),
    handleFileUpload,
    (req, res) => res.send("yup")
);
