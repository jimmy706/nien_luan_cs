import * as actionTypes from "../../constants/action-types";
import * as boardAPIs from "../../API/board.api";

function getBoardPending() {
  return {
    type: actionTypes.GET_BOARD_PENDING,
  };
}

function getBoardError(err) {
  return {
    type: actionTypes.GET_BOARD_ERROR,
    payload: err,
  };
}

function getBoardSuccess(data) {
  return {
    type: actionTypes.GET_BOARD_SUCCESS,
    payload: data,
  };
}

export function fetchBoardDetail(boardId, config) {
  return async (dispatch) => {
    dispatch(getBoardPending());
    try {
      const result = await boardAPIs.getBoardDetail(boardId, config);
      dispatch(getBoardSuccess(result.data));
    } catch (err) {
      dispatch(getBoardError(err));
    }
  };
}

export function updateBoard(data) {
  return {
    type: actionTypes.UPDATE_BOARD,
    payload: data,
  };
}
