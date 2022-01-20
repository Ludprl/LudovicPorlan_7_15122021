import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import UploadImg from "./UploadImg";
import "./Profil.css";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdateBio = () => {
        dispatch(updateBio(userData.id, bio));
        setUpdateForm(false);
    };

    return (
        <>
            <h1>
                Profil de {userData.lastName} {userData.firstName}
            </h1>
            <div className="profil-container">
                <div className="left-part">
                    <div className="update-container">
                        <div className="left-part">
                            <h3>Photo de profil</h3>
                            <img
                                src={userData.profileAvatar}
                                alt="user-avatar"
                            />
                            <UploadImg />
                        </div>
                    </div>
                </div>
                <div className="right-part">
                    <p>Membre depuis le {dateParser(userData.createdAt)}</p>
                    <p>
                        Derniere modification le{" "}
                        {dateParser(userData.updatedAt)}
                    </p>
                    <div className="bio-update">
                        <h4>Biographie</h4>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>
                                    {userData.bio}
                                </p>
                                <button
                                    onClick={() => setUpdateForm(!updateForm)}
                                >
                                    Modifier Bio
                                </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                ></textarea>
                                <button onClick={handleUpdateBio}>
                                    Valider
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProfil;
