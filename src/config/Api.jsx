import {AsyncStorage} from 'react-native';
import axios from 'axios';

export const API = axios.create({
    baseURL: "https://api.kontenbase.com/query/api/v1/badf3e67-4f70-4620-bb5c-f7ad72b77230/"
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};