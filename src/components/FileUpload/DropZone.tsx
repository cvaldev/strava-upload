import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = () => {
    const onDrop = useCallback((files) => {
        console.log(files);
        for (const file of files) {
            // console.log(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default DropZone;
