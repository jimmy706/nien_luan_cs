import * as actionTypes from "../../constants/action-types";

const initialState = {
  cardDetail: null,
  isPending: false,
  error: null,
};

function cardReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CARD_PENDING:
      return {
        ...state,
        cardDetail: null,
        isPending: true,
        error: null,
      };
    case actionTypes.GET_CARD_ERROR:
      return {
        ...state,
        cardDetail: null,
        isPending: true,
        error: action.payload,
      };
    case actionTypes.GET_CARD_SUCCESS:
      return {
        ...state,
        cardDetail: action.payload,
        isPending: false,
        error: null,
      };
    case actionTypes.UPDATE_CARD:
      return {
        ...state,
        cardDetail: action.payload,
      };
    default:
      return state;
  }
}

export default cardReducer;
