import {combineReducers} from 'redux';
import userReducer from "./user.reducer";
import errorReducer from "./errors.reducer";
import boardsReducerd from "./boards.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    errors: errorReducer,
    boards: boardsReducerd
});

export default rootReducer;