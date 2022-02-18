import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import Moment from "react-moment";
import "moment/locale/fr";
import "./Card.css";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";
import Linkify from "react-linkify";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const postContent = post.content;
    const dispatch = useDispatch();

    const diffDateH = (
        <Moment fromNow ago>
            {post.createdAt}
        </Moment>
    );

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container" key={post.id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-top">
                        <div className="card-top-left">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user.id === post.userId)
                                                return user.profileAvatar;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="poster-pic"
                            />
                            <div className="userLine">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user.id === post.userId)
                                                    return (
                                                        user.lastName +
                                                        " " +
                                                        user.firstName
                                                    );
                                                else return null;
                                            })
                                            .join("")}
                                </h3>
                                <span>Il y a {diffDateH}</span>
                            </div>
                        </div>
                        <div className="card-top-right">
                            {(userData.id === post.userId ||
                                userData.admin === true) && (
                                <div className="button-container">
                                    <div
                                        onClick={() => setIsUpdated(!isUpdated)}
                                    >
                                        <i
                                            className="fas fa-ellipsis-h"
                                            alt="Editer la publication"
                                        ></i>
                                    </div>
                                    <DeleteCard id={post.id} />
                                </div>
                            )}
                        </div>
                    </div>
                    {isUpdated === false && (
                        <Linkify
                            properties={{
                                target: "_blank",
                            }}
                        >
                            <p>
                                {postContent
                                    .split("\n")
                                    .map((postContent, key) => {
                                        return (
                                            <span key={key}>
                                                {postContent}

                                                <br />
                                            </span>
                                        );
                                    })}
                            </p>
                        </Linkify>
                    )}
                    {isUpdated === true && (
                        <div className="updatePost">
                            <textarea
                                defaultValue={post.content}
                                onChange={(e) => setTextUpdate(e.target.value)}
                            />
                            <div className="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Valider modifications
                                </button>
                            </div>
                        </div>
                    )}

                    {post.imagePost && (
                        <img
                            src={post.imagePost}
                            alt="card-pic"
                            className="card-picture"
                        />
                    )}
                    <div className="card-footer">
                        <div className="card-footer-top">
                            <div className="likes-number">
                                <i className="far fa-thumbs-up"></i>
                                <span>{post.Likes.length}</span>
                            </div>
                            <p>{post.Comments.length} Commentaires</p>
                        </div>
                        <hr></hr>
                        <div className="card-footer-bottom">
                            <LikeButton post={post} />

                            <div
                                className="comment-icon"
                                onClick={() => setShowComments(!showComments)}
                            >
                                <i
                                    className="far fa-comment-dots"
                                    alt="comment"
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                />
                            </div>
                        </div>

                        {showComments && <CardComment post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
