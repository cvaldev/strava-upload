import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import DropZone from "./DropZone";

interface Props {
    /**
     * URL to which we wish to make a POST request
     */
    uploadUrl: string;
}

export const FileUpload = (props: Props) => {
    const { uploadUrl } = props;
    const [files, setFiles] = useState(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        uploadHandler(files, uploadUrl);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(Array.from(e.target.files));
    };

    return (
        <div>
            <DropZone />
            <form onSubmit={handleSubmit}>
                <label>
                    Upload File: <br />
                    <input type="file" onChange={handleChange} multiple />
                </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

const uploadHandler = async (files, uploadUrl) => {
    const form = new FormData();
    for (const file of files) form.append("file", file);

    const response = await fetch(uploadUrl, { method: "post", body: form });
    if (response.ok) console.log(await response.json());
};
