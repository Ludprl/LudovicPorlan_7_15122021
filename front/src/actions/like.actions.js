import axios from "axios";

const access_token = localStorage.getItem("userToken");

export const GET_POST_LIKES = "GET_POST_LIKES";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPostLikes = (postId) => {
    return (dispatch) => {
        return axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId } });
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
