import axios from "axios";

const access_token = localStorage.getItem("userToken");

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                const array = res.data.slice(0, num);
                console.log(res.data);
                dispatch({ type: GET_POSTS, payload: array });
            })
            .catch((err) => console.log(err));
    };
};

export const likePost = (postId, isLiked, userId) => {
    return (dispatch) => {
        return axios({
            method: "post",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
            data: { like: isLiked },
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const unlikePost = (postId, isLiked, userId) => {
    return (dispatch) => {
        return axios({
            method: "post",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
            data: { like: isLiked },
        })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};
