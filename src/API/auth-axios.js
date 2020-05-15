import axios from "axios";
import {isAuth , getAuth} from "helpers/auth";

let authAxios = axios;

if(isAuth()) {
    authAxios.defaults.headers.common['Authorization'] = getAuth().token;
}

export default authAxios;