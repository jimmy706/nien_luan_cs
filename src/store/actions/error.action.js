import {SET_ERROR,REMOVE_ERROR} from "../../constants/action-types";

export function setErrorAct(errors) {
    return {
        type: SET_ERROR,
        payload: {errors}
    }
}


export function removeError() {
    return {
        type: REMOVE_ERROR
    }
}