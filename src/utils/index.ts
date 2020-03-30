import { Request } from "express";
import { extname } from "path";
import { unlinkSync } from "fs";
import multer from "multer";
import strava from "strava-v3";
import { FileFilterCallback } from "multer";
import { tmpdir } from "os";
import configuration from "../configuration";
import { logger } from "../logger";

export const isFileSupported = (fileName: string) => {
    const allowed = [".FIT", ".TCX", ".GPX"];
    const extension = extname(fileName.toUpperCase());

    return allowed.includes(extension);
};

export const deleteTempFile = (file: string) => {
    unlinkSync(file);
    logger.debug(`${file} deleted`);
};

export const upload = () => {
    if (configuration.env === "test") {
        // Don't save the files.
        return multer();
    }

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
        return isFileSupported(file.originalname)
            ? cb(null, true)
            : cb(null, false);
    };
    return multer({ dest: tmpdir(), fileFilter: fileFilter });
};

export const getUserActivities = (
    accessToken: string,
    page?: number,
    perPage?: number
) => {
    return strava.athlete.listActivities({
        access_token: accessToken,
        page: page,
        per_page: perPage
    });
};
