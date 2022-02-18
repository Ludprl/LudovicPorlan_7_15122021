import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import TextareaAutosize from "react-textarea-autosize";

const CardComment = ({ post }) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post.id, text))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""));
        }
    };
    return (
        <div className="comments-container">
            <div className="leave-comment">
                <form
                    action=""
                    onSubmit={handleComment}
                    className="comment-form"
                >
                    <TextareaAutosize
                        name="text"
                        placeholder="Laissez votre commentaire..."
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />

                    <button type="submit">Envoyer</button>
                </form>
            </div>
            {post.Comments.map((comment) => {
                const usersComment = comment.content;
                return (
                    <div className="comment-container">
                        <div className="comment-left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user.id === comment.userId)
                                                return user.profileAvatar;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="commenter-pic"
                            />
                        </div>
                        <div
                            className={
                                comment.userId === userData.id
                                    ? "comment-right-part-client"
                                    : "comment-right-part"
                            }
                            key={comment.id}
                        >
                            <div className="userLine">
                                <h5>
                                    {!isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user.id === comment.userId)
                                                    return (
                                                        user.lastName +
                                                        " " +
                                                        user.firstName
                                                    );
                                                else return null;
                                            })
                                            .join("")}
                                </h5>
                            </div>
                            <div className="comment-content">
                                {usersComment
                                    .split("\n")
                                    .map((usersComment, key) => {
                                        return (
                                            <span key={key}>
                                                {usersComment}
                                                <br />
                                            </span>
                                        );
                                    })}
                                {(userData.id === comment.userId ||
                                    userData.admin === true) && (
                                    <EditDeleteComment
                                        comment={comment}
                                        postId={post.id}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardComment;
