import {CREATE_BOARD} from "../../constants/action-types";

const initialState = [];

function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BOARD:
            const {boardName, _id} = action.payload.board;
            return [...state,{boardName, _id}];
        default:
            return [...state];
    }
}

export default boardsReducer;