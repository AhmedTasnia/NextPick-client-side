import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL: 'https://nextpick-bdfc0.web.app/'
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();

    // Request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {
            if (user && user.getIdToken) {
                const token = await user.getIdToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                signOutUser()
                    .then(() => console.log('Signed out due to unauthorized access'))
                    .catch((err) => console.log('Sign-out error', err));
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosSecure;
