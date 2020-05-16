import axios from "axios";
import * as URLs from "../constants/APIs";

export function createBoard(boardName, email, config) {
    return axios.post(URLs.CREATE_BOARD_URL, {boardName, email}, config);
}

export function deleteBoard(boardId, config) {
    return axios.delete(URLs.DELETE_BOARD_URL + boardId, config);
}

export function getBoardDetail(boardId, config) {
    return axios.get(URLs.GET_BOARD_DETAIL_URL + boardId, config);
}

export function addNewList(boardId, listName, config) {
    return axios.post(URLs.ADD_NEW_LIST_URL + boardId, {listName}, config);
}

export function changeBoardName(boardId, boardName, config) {
    return axios.put(URLs.CHANGE_BOARD_NAME_URL + boardId, {boardName}, config);
}