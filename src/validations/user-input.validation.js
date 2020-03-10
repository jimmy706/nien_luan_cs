import {EMPTY_PASSWORD, VALIDATE_PASSWORD, VALIDATE_EMAIL, USERNAME_VALIDATE} from "../constants/error-message";

export function passwordValidate(value) {
    const passwordPattern = /^[A-Za-z0-9]\w{5,29}$/;
    if(value.trim().length < 1) {
        return EMPTY_PASSWORD;
    }
    else if(!passwordPattern.test(value)) {
        return VALIDATE_PASSWORD;
    }
}

export function usernameValidate(value) {
    const usernamePattern = /^[A-Za-z0-9]\w{3,14}$/;
    return usernamePattern.test(value) ? '' : USERNAME_VALIDATE;
}


export function emailValidation(value) {
    const emailPattern =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
    return emailPattern.test(value) ? '' : VALIDATE_EMAIL;
}