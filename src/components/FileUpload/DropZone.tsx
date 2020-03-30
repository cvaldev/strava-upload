import { CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import { Container } from "react-bootstrap";

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
    /**
     * Dropzone's child elements
     */
    children?: any;
}

const DropZone = (props: Props) => {
    const { className, style, onDrop, children } = props;

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".fit, .tcx, .gpx"
    });

    return (
        <Container
            {...getRootProps({
                className: className,
                style: style
            })}
        >
            <input {...getInputProps()} />
            {children}
        </Container>
    );
};

export default DropZone;
