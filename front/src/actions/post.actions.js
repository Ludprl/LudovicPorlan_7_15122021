import axios from "axios";

const access_token = localStorage.getItem("userToken");

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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
                dispatch({ type: GET_POSTS, payload: array });
            })
            .catch((err) => {
                console.log(err);
                const errorData = err.response.data;
                if (errorData.sessionMessage === "Session expire") {
                    localStorage.removeItem("userToken");
                    window.location.reload();
                }
            });
    };
};

export const addPost = (data) => {
    return (dispatch) => {
        return axios.post(`${process.env.REACT_APP_API_URL}api/post`, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
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

export const addComment = (postId, text) => {
    return (dispatch) => {
        return axios({
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
            data: { content: text },
        })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
            data: { content: text, commentId: commentId },
        })
            .then((res) => {
                dispatch({
                    type: EDIT_COMMENT,
                    payload: { postId, commentId, text },
                });
            })
            .catch((err) => console.log(err));
    };
};
export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
        })
            .then((res) => {
                dispatch({
                    type: DELETE_COMMENT,
                    payload: { postId, commentId },
                });
            })
            .catch((err) => console.log(err));
    };
};
