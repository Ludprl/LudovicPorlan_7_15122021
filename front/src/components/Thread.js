import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import Card from "./Post/Card";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [postCount, setpostCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        const loadMore = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 5 >
                document.scrollingElement.scrollHeight
            ) {
                setLoadPost(true);
                setpostCount(postCount + 2);
            }
        };
        if (loadPost) {
            dispatch(getPosts(postCount));
            setLoadPost(false);
        }

        window.addEventListener("scroll", loadMore);
        return () => window.removeEventListener("scroll", loadMore);
    }, [loadPost, dispatch, postCount]);

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post.id} />;
                    })}
            </ul>
        </div>
    );
};

export default Thread;
