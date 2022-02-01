import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { getPosts, likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const Uid = useContext(UidContext);
    const LikeArray = post.Likes;

    const like = () => {
        dispatch(likePost(post.id, liked, Uid)).then(() =>
            dispatch(getPosts())
        );
        setLiked(true);
    };
    const unlike = () => {
        dispatch(unlikePost(post.id, liked, Uid)).then(() =>
            dispatch(getPosts())
        );
        setLiked(false);
    };

    useEffect(() => {
        if (LikeArray.some((e) => e.userId === Uid)) {
            setLiked(true);
        } else setLiked(false);
    }, [Uid, LikeArray]);

    return (
        <>
            {liked ? (
                <div className="like-container" onClick={unlike} id="liker">
                    <i className="fas fa-thumbs-up" alt="Ne plus aimer"></i>
                </div>
            ) : (
                <div className="like-container" onClick={like} id="liker">
                    <i className="far fa-thumbs-up" alt="Aimer"></i>
                </div>
            )}
        </>
    );
};

export default LikeButton;
