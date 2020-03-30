import { Request, Response } from "express";
import { extname } from "path";
import { deleteTempFile } from "../../../utils";
import strava from "strava-v3";
import { IUser } from "../../../interfaces";
import { logger, errLogger } from "../../../logger";

const uploadFilesToStrava = async (req: Request, res: Response) => {
    const files = <Express.Multer.File[]>req.files;

    if (!files.length) {
        return res.status(400).json({
            error: "BAD REQUEST",
            message: "no files in request"
        });
    }
    const { accessToken, id } = <IUser>req.user;

    const uploads = [];

    // Send each file individually.
    for (const file of files) {
        const { path, originalname } = file;
        const dataType = extname(originalname).replace(".", "");
        logger.debug(`${id} attempting to send ${path}`);

        const [payload, error] = await uploadFile(accessToken, dataType, path);

        if (!error) {
            logger.debug(`Uploaded ${path}.`);
            uploads.push(payload);
        } else {
            errLogger.error(`Failed to upload file! ${error}. User:${id}`);
            deleteTempFile(path);
        }
    }

    return res.json({ uploads });
};

const uploadFile = async (
    accessToken: string,
    dataType: string,
    file: string
): Promise<[any, any]> => {
    try {
        const payload = await strava.uploads.post(
            {
                access_token: accessToken,
                data_type: dataType,
                file: file
            },
            () => {}
        );

        deleteTempFile(file);
        return [payload, null];
    } catch (error) {
        return [null, error];
    }
};

export default uploadFilesToStrava;
