import { Request, Response, NextFunction } from "express";
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
const fileFilter = (req, file, cb) =>
    extname(file.originalname) == ".FIT" ? cb(null, true) : cb(null, false);

const upload = multer({ dest: "uploads/", fileFilter: fileFilter });

const handleFileUpload = async (req: Request, res: Response) => {
    // const { id, token } = req.params;
    // if (!id || !token) {
    //     res.status(400).json({ error: "BAD REQUEST", params: {id:id, token:token} });
    // }
    if (!req.file) {
        console.log("No file in request!");
        res.json({
            error: "BAD REQUEST"
        });
        return;
    }
    const { accessToken, id } = <IUser>req.user;
    console.log(`Processing file for ${id}`);
    const { path, originalname } = req.file;
    const file = join(__dirname, path);
    const dataType = extname(originalname).replace(".", "");

    console.log(`Sending ${file} to strava`);

    // @ts-ignore: property `uploads` does not exist
    // Why did I ever think using TS was a good idea???
    const response = await strava.uploads.post(
        {
            access_token: accessToken,
            data_type: dataType,
            file: file
        },
        (err, payload) => {
            if (err) console.log(err);
        }
    );
    unlink(file, (e) => {
        if (e) console.log(e);
        console.log(`${file} was deleted`);
    });
    res.json(response);
};

router.post(
    "/api/upload",
    // authService.ensureLogin,
    // authService.refreshToken,
    upload.single("file"),
    handleFileUpload
);
