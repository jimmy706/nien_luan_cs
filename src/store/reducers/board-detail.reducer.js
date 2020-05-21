import * as actionTypes from "../../constants/action-types";

const initialState = {
  boardInfo: null,
  getBoardPending: false,
  getBoardError: null,
};

function boardDetailReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BOARD_PENDING:
      return {
        ...state,
        getBoardPending: true,
        getBoardError: null,
        boardInfo: null,
      };
    case actionTypes.GET_BOARD_ERROR:
      return {
        ...state,
        getBoardPending: false,
        getBoardError: action.payload,
        boardInfo: null,
      };
    case actionTypes.GET_BOARD_SUCCESS:
      return {
        ...state,
        getBoardPending: false,
        getBoardError: null,
        boardInfo: action.payload,
      };
    case actionTypes.UPDATE_BOARD:
      return { ...state, boardInfo: action.payload };
    default:
      return state;
  }
}

export default boardDetailReducer;
