import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const Uid = useContext(UidContext);
    const LikeArray = post.Likes;
    const LikeObject = post.Likes[0];

    console.log(LikeObject);

    const like = () => {
        dispatch(likePost(post.id, liked, Uid));
        setLiked(true);
    };
    const unlike = () => {
        dispatch(unlikePost(post.id, liked, Uid));
        setLiked(false);
    };

    useEffect(() => {
        if (LikeArray.some((e) => e.userId === Uid)) {
            setLiked(true);
        } else setLiked(false);
    }, []);

    return (
        <div className="like-container">
            {liked ? (
                <i
                    className="fas fa-thumbs-up"
                    onClick={unlike}
                    alt="Ne plus aimer"
                ></i>
            ) : (
                <i className="far fa-thumbs-up" onClick={like} alt="Aimer"></i>
            )}
        </div>
    );
};

export default LikeButton;
