import axios from "axios";

const axiosConn = axios.create({
    baseURL: `https://localhost:3003`,
});

export default axiosConn;

axios.defaults.withCredentials = true;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log("Interceptor Request (Outgoing) ", config);

        return config;
    },
    function (error) {
        // Request error
        return Promise.reject(error);
    }
);

// Response interceptor (Incoming) - Optional
axiosConn.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger

        // Response data
        console.log("Interceptor Response (Incoming) ", response);

        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

        // Do something with response error
        return Promise.reject(error);
    }
);
