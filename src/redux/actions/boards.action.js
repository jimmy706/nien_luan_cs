import {GET_BOARDS_URL,CREATE_BOARD_URL} from "../../constants/APIs";
import axios from "axios";
import {CREATE_BOARD} from "../../constants/action-types";

function createBoard(board) {
    return {
        type: CREATE_BOARD,
        payload: {
            board
        }
    }
}

export function createBoardAction(boardInfo, userId) {
    const {boardName} = boardInfo;
    return async dispatchEvent => {
       try {
           const boardCreate = await axios.post(`${CREATE_BOARD_URL}/${userId}`, {boardName});
           console.log(boardCreate);
           dispatchEvent(createBoard(boardCreate.data));
       }
        catch (e){
           console.log(e.response);
        }
    }
}