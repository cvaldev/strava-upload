import { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    /**
     * Defines the class of the dropzone.
     */
    className?: string;
    /**
     * Defines the style of the dropzone.
     */
    style?: CSSProperties;
    /**
     * Drop event handler
     */
    onDrop: (any) => void;
}
const DropZone = (props: Props) => {
    const { className, style, onDrop } = props;

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".fit, .tcx, .gpx"
    });
    //@ts-ignore
    const files = acceptedFiles.map((file) => (
        //@ts-ignore
        <li key={file.path}>{file.name}</li>
    ));
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <ul>{files}</ul>
        </div>
    );
};

export default DropZone;
