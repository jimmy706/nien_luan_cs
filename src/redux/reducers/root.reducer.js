import {combineReducers} from 'redux';
import userReducer from "./user.reducer";
import errorReducer from "./errors.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    errors: errorReducer
});

export default rootReducer;