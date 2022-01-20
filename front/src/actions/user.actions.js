import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

const access_token = localStorage.getItem("userToken");

export const getUser = (Uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${Uid}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}api/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => {
                        dispatch({
                            type: UPLOAD_PICTURE,
                            payload: res.data.profileAvatar,
                        });
                    });
            })
            .catch((err) => console.log(err));
    };
};

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: { bio },
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio });
            })
            .catch((err) => console.log(err));
    };
};
