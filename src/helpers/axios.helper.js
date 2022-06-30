import axios from 'axios';
import { message,notification } from "antd";


axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (!response.data.success && response?.data?.message) {
        notification.error({ message: 'Notification',
        description:(response?.data?.message)});
       
    } 

    if (response.data.success && response?.data?.message) {
        notification.success({ message: 'Notification',
        description:(response?.data?.message)});
        
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    notification.error({ message: 'Notification',
        description:(error?.response?.data?.message || "Something went wrong. Please try again later.")});
    return Promise.reject(error);
});

export default axios;
