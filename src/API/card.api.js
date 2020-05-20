import axios from "axios";
import * as URLs from "../constants/APIs";

export function listCard(listId) {
    return axios.get(URLs.LIST_CARD + listId);
}

export function addNewCard(listId, cardTitle) {
    return axios.post(URLs.ADD_CARD + listId, {cardTitle});
}

export function updateCardDescription(cardId, description, token) {
    return axios.put(URLs.UPDATE_CARD_DESC + cardId, {description}, {
        headers: {
            'Authorization': token
        }
    })
}