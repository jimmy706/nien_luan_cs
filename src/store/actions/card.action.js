import axios from 'axios';
import * as URLs from "../../constants/APIs";
import {GET_CARD_ERROR, GET_CARD_PENDING, GET_CARD_SUCCESS} from "../../constants/action-types";

function getCardPending() {
    return {
        type: GET_CARD_PENDING
    }
}

function getCardError(err) {
    return {
        type: GET_CARD_ERROR,
        payload: err
    }
}

function getCardSuccess(cardDetail) {
    return {
        type: GET_CARD_SUCCESS,
        payload: cardDetail
    }
}

export function fetchCardAction(cardId, token) {
    return async dispatch => {
        dispatch(getCardPending());
        try {
            const result = await axios.get(URLs.GET_CARD_DETAIL + cardId, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(getCardSuccess(result.data));
        }catch (e) {
            dispatch(getCardError(e));
        }
    };
}