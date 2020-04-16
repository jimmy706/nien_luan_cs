import {CREATE_BOARD, DELETE_BOARD, GET_BOARDS} from "../../constants/action-types";

const initialState = [];

function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BOARD:
            return [...state,action.payload.board];
        case GET_BOARDS:
            return [...action.payload.boards];
        case DELETE_BOARD:
            return state.filter(b => b._id !== action.payload.boardId);
        default:
            return [...state];
    }
}

export default boardsReducer;