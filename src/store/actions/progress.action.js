import {ON_DONE, ON_LOAD} from "../../constants/action-types";

export function onLoadAction(label) {
    return {
        type: ON_LOAD,
        payload: {
            label
        }
    }
}

export function onDoneAction() {
    return {
        type: ON_DONE
    }
}