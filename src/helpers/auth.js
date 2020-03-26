import axios from "axios";


export function setToken(token, exp) {
    localStorage.setItem("jwtToken",JSON.stringify({token, expire: exp}));
    axios.defaults.headers.common['Authorization'] = token;
}

export function isAuth() {

    const jwt = JSON.parse(localStorage.getItem("jwtToken"));
    if(!jwt) {
        return false;
    }
    const now = new Date().getTime();
    const result = now < jwt.expire;
    if(result){
        axios.defaults.headers.common['Authorization'] = jwt.token;
        return true;
    }
    return false;
}