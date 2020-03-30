import { Request, Response } from "express";
import { extname } from "path";
import { uploadFile } from "../../../utils";
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
        }
    }

    return res.json({ uploads });
};

export default uploadFilesToStrava;
