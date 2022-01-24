import axios from "axios";

const access_token = localStorage.getItem("userToken");

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

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

export const updatePost = (postId, content) => {
    return (dispatch) => {
        return axios({
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { content: content },
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { postId, content } });
            })
            .catch((err) => console.log(err));
    };
};

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};
