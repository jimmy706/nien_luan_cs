import axios from 'axios';
import * as URLs from "../constants/APIs";

export function changeListName({boardId, listId, newName},config) {
    return axios.put(URLs.CHANGE_LIST_NAME_URL, {boardId, listId, newName}, config);
}

export function deleteList(boardId, listId, config) {
    return axios.put(URLs.DELETE_LIST_URL, {boardId, listId}, config);
}