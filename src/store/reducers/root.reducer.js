import {combineReducers} from 'redux';
import userReducer from "./user.reducer";
import errorReducer from "./errors.reducer";
import boardsReducerd from "./boards.reducer";
import progressReducer from "./progress.reducer";
import cardReducer from "./card.reducer";

const rootReducer = combineReducers({
    cardState: cardReducer,
    user: userReducer,
    errors: errorReducer,
    boards: boardsReducerd,
    progress: progressReducer,
});

export default rootReducer;