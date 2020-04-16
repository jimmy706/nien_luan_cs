import {LOGIN_ACTION, LOGOUT_ACTION} from "../../constants/action-types";

const initialState = {
    username: '',
    avatar: '',
    email: '',
    id: ''
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_ACTION:
            return {...action.payload.user};
        case LOGOUT_ACTION:
            return {...initialState};
        default:
            return {...state};
    }
}

export default userReducer;