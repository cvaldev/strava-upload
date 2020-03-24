import React, { useState } from "react";
import fetch from "isomorphic-unfetch";

interface Props {
    /**
     * URL to which we wish to make a POST request
     */
    uploadUrl: string;
}
const FileUpload = (props: Props) => {
    const { uploadUrl } = props;
    const [file, setFile] = useState(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        uploadHandler(file, uploadUrl);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload File: <br />
                    <input type="file" onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

const uploadHandler = async (file, uploadUrl) => {
    const form = new FormData();
    form.append("file", file);
    const response = await fetch(uploadUrl, { method: "post", body: form });
    if (response.ok) console.log(await response.json());
};

export default FileUpload;
