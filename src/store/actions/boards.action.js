import {
  CREATE_BOARD,
  DELETE_BOARD,
  GET_BOARDS,
} from "../../constants/action-types";
import { onDoneAction, onLoadAction } from "./progress.action";
import { getAuth } from "../../helpers/auth";
import * as boardAPIs from "API/board.api";

function createBoard(board) {
  return {
    type: CREATE_BOARD,
    payload: {
      board,
    },
  };
}

function deleteAction(boardId) {
  return {
    type: DELETE_BOARD,
    payload: {
      boardId,
    },
  };
}

export function createBoardAction(boardInfo, email) {
  const { boardName } = boardInfo;
  return async (dispatchEvent) => {
    dispatchEvent(onLoadAction("Creating board..."));
    try {
      const boardCreate = await boardAPIs.createBoard(boardName, email, {
        headers: {
          Authorization: `${getAuth().token}`,
        },
      });
      dispatchEvent(createBoard(boardCreate.data));
    } catch (e) {
      console.log(e.response);
    } finally {
      dispatchEvent(onDoneAction());
    }
  };
}

export function setBoardsAction(boards) {
  return {
    type: GET_BOARDS,
    payload: {
      boards,
    },
  };
}

export function deleteBoardAction(boardId) {
  return async (dispatchEvent) => {
    dispatchEvent(onLoadAction("Deleting board..."));
    try {
      const res = await boardAPIs.deleteBoard(boardId, {
        headers: {
          Authorization: `${getAuth().token}`,
        },
      });
      if (res.data.SUCCESS) {
        dispatchEvent(deleteAction(boardId));
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      dispatchEvent(onDoneAction());
    }
  };
}
