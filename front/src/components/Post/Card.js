import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import Moment from "react-moment";
import "moment/locale/fr";
import "./Card.css";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const diffDateH = (
        <Moment fromNow ago>
            {post.createdAt}
        </Moment>
    );

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
                                            })
                                            .join("")}
                                </h3>
                                <span>Il y a {diffDateH}</span>
                            </div>
                        </div>
                        <div className="card-top-right">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    <p>{post.content}</p>
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
                            <p>852 Commentaires</p>
                        </div>
                        <div className="card-footer-bottom">
                            <LikeButton post={post} />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
