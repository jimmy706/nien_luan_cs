import {LOGIN_ACTION, LOGOUT_ACTION} from "../../constants/action-types";
import jwtDecode from 'jwt-decode';
import {setToken, removeAuthToken} from "../../helpers/auth";
import Router from "next/router";
import {setErrorAct, removeError} from "./error.action";
import {onLoadAction, onDoneAction} from "./progress.action";
import * as authAPIs from "../../API/auth";

function setCurrentUserAct(user) {
    return {
        type: LOGIN_ACTION,
        payload: {user}
    }
}

export function loginAction(userInfo) {
    return async dispatchEvent => {
        dispatchEvent(onLoadAction("Login progress..."));
        try {
            const loginSuccess = await authAPIs.login(userInfo);
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
        finally {
            dispatchEvent(onDoneAction());
        }
    }
}

export function  loginOAuthAction(ggProfile) {
    return async dispatchEvent => {
        dispatchEvent(onLoadAction("Login progress..."));
       try {
           const loginSuccess = await authAPIs.loginOAuth(ggProfile);
           const token = loginSuccess.data.token;
           const user = jwtDecode(token);
           setToken(token,user.exp * 1000);
           dispatchEvent(setCurrentUserAct(user));
           Router.push("/boards");
       }
       catch (e) {
           console.log(e.response);
       }
       finally {
           dispatchEvent(onDoneAction());
       }
    }
}

export function logoutAction(){
    return dispatchEvent => {
        dispatchEvent(onLoadAction("Login out..."));
        removeAuthToken();
        dispatchEvent({
            type: LOGOUT_ACTION
        });

        dispatchEvent(onDoneAction());
        Router.push("/");
    }
}
