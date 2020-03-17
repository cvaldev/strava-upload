import { extname } from "path";
// const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileFilterCallback
// ) => (extname(file.originalname) == ".FIT" ? cb(null, true) : cb(null, false));

// const deleteTempFile = (file: string) => {
//     unlink(file, (e) => {
//         if (e) console.log(e);
//         console.log(`${file} deleted`);
//     });
// };
export const isFileSupported = (fileName: string) => {
    const allowed = [".FIT", ".TCX", ".GPX"];
    const extension = extname(fileName.toUpperCase());

    return allowed.includes(extension);
};
// const handleFileUpload = async (req: Request, res: Response) => {
//     if (!req.file) {
//         res.status(400).json({
//             error: "BAD REQUEST",
//             message: { file: req.file }
//         });
//         return;
//     }

//     const { accessToken, id } = <IUser>req.user;
//     const { path: file, originalname } = req.file;
//     const dataType = extname(originalname).replace(".", "");
//     try {
//         console.log(`${id} sending ${file}`);

//         // @ts-ignore: property `uploads` does not exist
//         // Why did I ever think using TS was a good idea???
//         const payload = await strava.uploads.post(
//             {
//                 access_token: accessToken,
//                 data_type: dataType,
//                 file: file
//             },
//             () => deleteTempFile(file)
//         );

//         res.json(payload);
//     } catch (e) {
//         res.status(e.statusCode).json(e.error);
//     }
// };
