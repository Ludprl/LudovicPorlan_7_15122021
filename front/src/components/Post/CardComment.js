import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

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
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                    />
                    <input type="submit" />
                </form>
            </div>
            {post.Comments.map((comment) => {
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
                                (console.log(comment.userId),
                                comment.userId === userData.id
                                    ? "comment-right-part-client"
                                    : "comment-right-part")
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
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardComment;
