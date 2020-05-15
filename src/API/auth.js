import axios from 'axios';
import * as URLs from "../constants/APIs";

export function login(userInfo) {
     return axios.post(URLs.LOGIN_URL, userInfo);
}

export function loginOAuth(ggProfile) {
    return axios.post(URLs.LOGIN_WITH_OAUTH_URL, ggProfile);
}