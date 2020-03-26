import {LOGIN_ACTION} from "../../constants/action-types";
import {LOGIN_URL, LOGIN_WITH_OAUTH_URL} from "../../constants/APIs";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {setToken} from "../../helpers/auth";
import Router from "next/router";

function setCurrentUserAct(user) {
    return {
        type: LOGIN_ACTION,
        payload: {user}
    }
}

export function loginAction(userInfo) {
    return async dispatchEvent => {
        try {
            const loginSuccess = await axios.post(LOGIN_URL,userInfo);
            const token = loginSuccess.data.token;
            const user = jwtDecode(token);
            setToken(token,user.exp * 1000);
            dispatchEvent(setCurrentUserAct(user));
            Router.push("/boards");
        }
        catch (err) {
            console.error(err);
        }
    }
}

export function  loginOAuthAction(ggProfile) {
    return async dispatchEvent => {
       try {
           const loginSuccess = await axios.post(LOGIN_WITH_OAUTH_URL,ggProfile);
           const token = loginSuccess.data.token;
           const user = jwtDecode(token);
           setToken(token,user.exp * 1000);
           dispatchEvent(setCurrentUserAct(user));
           Router.push("/boards");
       }
       catch (e) {
           console.log(e);
       }
    }

}
