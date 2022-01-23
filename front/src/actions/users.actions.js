import axios from "axios";

export const GET_USERS = "GET_USERS";

const access_token = localStorage.getItem("userToken");

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
