import {LOGIN_ACTION, LOGOUT_ACTION} from "../../constants/action-types";
import {LOGIN_URL, LOGIN_WITH_OAUTH_URL} from "../../constants/APIs";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {setToken, removeAuthToken} from "../../helpers/auth";
import Router from "next/router";
import {setErrorAct, removeError} from "./error.action";

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
            dispatchEvent(removeError());
        }
        catch (err) {
            dispatchEvent(setErrorAct(err.response.data));
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
           console.log(e.response);
       }
    }
}

export function logoutAction(){
    removeAuthToken();
    return dispatchEvent => {
        dispatchEvent({
            type: LOGOUT_ACTION
        });
        Router.push("/");
    }
}
