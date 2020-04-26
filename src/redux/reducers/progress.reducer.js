import {ON_DONE, ON_LOAD} from "../../constants/action-types";

const initialState = {
    isLoading: false,
    label: ""
};

function progressReducer(state = initialState, action) {
    switch (action.type) {
        case ON_LOAD:
            return {
                isLoading: true,
                label: action.payload.label
            };
        case ON_DONE:
            return {
                isLoading: false,
                label: ""
            };
        default:
            return {...state};
    }
}

export default progressReducer;