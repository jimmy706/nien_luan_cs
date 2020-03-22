import {LOGIN_ACTION} from "../../constants/action-types";
import {LOGIN_URL} from "../../constants/APIs";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function setCurrentUserAct(user) {
    return {
        type: LOGIN_ACTION,
        payload: user
    }
}

export function  loginAction(userInfo) {
    return async dispatchEvent => {
        console.log('sdssdsd');
        try {
            const loginSuccess = await axios.post(LOGIN_URL,userInfo);
            const token = loginSuccess.data.token;
            const user = jwtDecode(token);
            console.log('Success' + user);
            localStorage.setItem("jwtToken",JSON.stringify({token, expire: user.exp * 1000}));
            dispatchEvent(setCurrentUserAct(user));
        }
        catch (err) {
            console.error('Something when wrong...');
        }
    }
}
