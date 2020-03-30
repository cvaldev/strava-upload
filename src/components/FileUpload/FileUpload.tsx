import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import DropZone from "./DropZone";
import { Button, Form, ListGroup } from "react-bootstrap";

interface Props {
    /**
     * URL to which we wish to make a POST request
     */
    uploadUrl: string;
    /**
     * Maximum number of files accepted
     */
    max?: number;
}

export const FileUpload = (props: Props) => {
    const { uploadUrl, max } = props;
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await uploadHandler(files, uploadUrl);
        setFiles([]);
    };
    const onDrop = (acceptedFiles: File[]) => {
        // Filter out files already on the list.
        const newFiles = acceptedFiles.filter(({ name }) => {
            const fileNames = files.map(({ name }) => name);
            return !fileNames.includes(name);
        });
        if (files.length + acceptedFiles.length <= max) {
            setFiles(files.concat(newFiles));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDropZone">
                <DropZone onDrop={onDrop} className="dropzone">
                    <p className="back-text">
                        {files.length
                            ? `Add ${
                                  max ? `up to ${max - files.length}` : ``
                              } more files`
                            : `Drag & Drop ${
                                  max ? `up to ${max - files.length}` : ``
                              } files or click to load`}
                    </p>
                    <ListGroup className="file-list" variant="flush">
                        {files?.map((file) => (
                            <ListGroup.Item key={file.name}>
                                {file.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </DropZone>
            </Form.Group>
            <Button
                type="submit"
                className="upload-btn"
                size="lg"
                block
                disabled={files.length > 0 ? false : true}
            >
                Upload
            </Button>
        </Form>
    );
};

const uploadHandler = async (files: File[], uploadUrl: string) => {
    const form = new FormData();
    for (const file of files) form.append("file", file);

    const response = await fetch(uploadUrl, { method: "post", body: form });
    if (response.ok) {
        return response.json();
    }
};
