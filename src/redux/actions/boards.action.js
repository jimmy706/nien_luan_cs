import {DELETE_BOARD_URL,CREATE_BOARD_URL} from "../../constants/APIs";
import axios from "axios";
import {CREATE_BOARD, DELETE_BOARD, GET_BOARDS} from "../../constants/action-types";

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
           dispatchEvent(createBoard(boardCreate.data));
       }
        catch (e){
           console.log(e.response);
        }
    }
}

export function setBoardsAction(boards) {
    return {
        type: GET_BOARDS,
        payload: {
            boards
        }
    }
}

function deleteAction(boardId) {
    return {
        type: DELETE_BOARD,
        payload: {
            boardId
        }
    }
}

export function deleteBoardAction(boardId){
    return async dispatchEvent => {
        try{
            const res = await axios.delete(`${DELETE_BOARD_URL}/${boardId}`);
            if(res.data.SUCCESS){
                dispatchEvent(deleteAction(boardId));
            }
        }
        catch (e) {
            console.log(e.response);
        }
    }
}