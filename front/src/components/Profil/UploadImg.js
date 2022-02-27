import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";

const UploadImg = () => {
    const [file, setFile] = useState();
    const [selectedFile, setSelectedFile] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.lastName);
        data.append("userId", userData.id);
        data.append("file", file);

        await dispatch(uploadPicture(data, userData.id));
        await dispatch(getUsers());
        setIsUploaded(true);
    };

    const handleFileInput = async (e) => {
        const fullPath = document.getElementById("file").value;
        if (fullPath) {
            const startIndex =
                fullPath.indexOf("\\") >= 0
                    ? fullPath.lastIndexOf("\\")
                    : fullPath.lastIndexOf("/");
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
                filename = filename.substring(1);
            }
            setSelectedFile(filename);
        }
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer de photo de profil</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                    handleFileInput();
                }}
            />
            <p>{selectedFile}</p>
            <input type="submit" value="Envoyer" className="send-upload" />
        </form>
    );
};

export default UploadImg;
