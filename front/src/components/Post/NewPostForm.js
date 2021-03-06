import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Linkify from "react-linkify";
import TextareaAutosize from "react-textarea-autosize";

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();

            data.append("content", message);
            if (file) data.append("file", file);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un message");
        }
    };
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };
    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData, message]);

    return (
        <div className="post-form-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <div className="post-form">
                    <TextareaAutosize
                        className="autoExpand"
                        name="message"
                        id="message"
                        placeholder="Du nouveau ?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />

                    {message || postPicture ? (
                        <li className="card-container">
                            <div className="card-top">
                                <div className="card-top-left">
                                    <img
                                        src={userData.profileAvatar}
                                        alt="poster-pic"
                                    />
                                    <div className="userLine">
                                        <h3>
                                            {userData.lastName +
                                                " " +
                                                userData.firstName}
                                        </h3>
                                        <span>Il y a une minute</span>
                                    </div>
                                </div>
                            </div>
                            <p>
                                {message.split("\n").map((message, key) => {
                                    return (
                                        <span key={key}>
                                            <Linkify
                                                properties={{
                                                    target: "_blank",
                                                }}
                                            >
                                                {message}
                                            </Linkify>

                                            <br />
                                        </span>
                                    );
                                })}
                            </p>
                            <img src={postPicture} alt="" />
                        </li>
                    ) : null}

                    <div className="form-footer">
                        <label htmlFor="file">
                            <i className="far fa-image" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".gif, .jpg, .jpeg, .png"
                            onChange={(e) => handlePicture(e)}
                        />
                        <div className="btn-send">
                            {message || postPicture ? (
                                <button onClick={cancelPost}>
                                    Annuler publication
                                </button>
                            ) : null}

                            <button className="send" onClick={handlePost}>
                                Publier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPostForm;
