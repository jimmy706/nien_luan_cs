import {LOGIN_ACTION} from "../../constants/action-types";

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
        default:
            return {...state};
    }
}

export default userReducer;