import {DELETE_BOARD_URL,CREATE_BOARD_URL} from "../../constants/APIs";
import axios from "axios";
import {CREATE_BOARD, DELETE_BOARD, GET_BOARDS} from "../../constants/action-types";
import {onDoneAction, onLoadAction} from "./progress.action";
import {getAuth} from "../../helpers/auth";

function createBoard(board) {
    return {
        type: CREATE_BOARD,
        payload: {
            board
        }
    }
}

export function createBoardAction(boardInfo, email) {
    const {boardName} = boardInfo;
    return async dispatchEvent => {
        dispatchEvent(onLoadAction("Creating board..."));
       try {
           const boardCreate = await axios.post(CREATE_BOARD_URL, {boardName, email},{
               headers: {
                   'Authorization': `${getAuth().token}`
               }
           });
           dispatchEvent(createBoard(boardCreate.data));
       }
        catch (e){
           console.log(e.response);
        }
        finally {
           dispatchEvent(onDoneAction());
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
        dispatchEvent(onLoadAction("Deleting board..."));
        try{
            const res = await axios.delete(`${DELETE_BOARD_URL}/${boardId}`);
            if(res.data.SUCCESS){
                dispatchEvent(deleteAction(boardId));
            }
        }
        catch (e) {
            console.log(e.response);
        }
        finally {
            dispatchEvent(onDoneAction());
        }
    }
}