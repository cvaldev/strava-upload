import { Request } from "express";
import { extname } from "path";
import { unlinkSync } from "fs";
import * as multer from "multer";
import * as strava from "strava-v3";
import { FileFilterCallback } from "multer";
import { tmpdir } from "os";
import { configuration } from "../configuration";

export const isFileSupported = (fileName: string) => {
    const allowed = [".FIT", ".TCX", ".GPX"];
    const extension = extname(fileName.toUpperCase());

    return allowed.includes(extension);
};

export const deleteTempFile = (file: string) => {
    unlinkSync(file);
    return `${file} deleted`;
};
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => (isFileSupported(file.originalname) ? cb(null, true) : cb(null, false));

export const upload = () => {
    if (configuration.env === "test") return multer();
    return multer({ dest: tmpdir(), fileFilter: fileFilter });
};

export const uploadFile = async (
    accessToken: string,
    dataType: string,
    file: string
): Promise<[any, any]> => {
    try {
        // @ts-ignore: property `uploads` does not exist
        const payload = await strava.uploads.post(
            {
                access_token: accessToken,
                data_type: dataType,
                file: file
            },
            () => console.log(deleteTempFile(file))
        );

        return [payload, null];
    } catch (error) {
        return [null, error];
    }
};
