import {REMOVE_ERROR, SET_ERROR} from "../../constants/action-types";

const initialState = {

};

function errorsReducer(state = initialState,action) {
    switch (action.type) {
        case SET_ERROR:
            return {...action.payload.errors};
        case REMOVE_ERROR:
            return {};
        default:
            return {...state};
    }
}
export default errorsReducer;