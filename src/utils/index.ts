import { extname } from "path";
import { unlink } from "fs";

export const isFileSupported = (fileName: string) => {
    const allowed = [".FIT", ".TCX", ".GPX"];
    const extension = extname(fileName.toUpperCase());

    return allowed.includes(extension);
};

export const deleteTempFile = (file: string) =>
    unlink(file, (e) => (e ? e : `${file} deleted`));
