import axios from "axios";
import * as URLs from "../constants/APIs";

export function createBoard(boardName, email, config) {
  return axios.post(URLs.CREATE_BOARD_URL, { boardName, email }, config);
}

export function deleteBoard(boardId, config) {
  return axios.delete(URLs.DELETE_BOARD_URL + boardId, config);
}

export function getBoardDetail(boardId, config) {
  return axios.get(URLs.GET_BOARD_DETAIL_URL + boardId, config);
}

export function addNewList(boardId, listName, config) {
  return axios.post(URLs.ADD_NEW_LIST_URL + boardId, { listName }, config);
}

export function changeBoardName(boardId, boardName, config) {
  return axios.put(URLs.CHANGE_BOARD_NAME_URL + boardId, { boardName }, config);
}

export function addMember(boardId, email, token) {
  return axios.put(
    URLs.ADD_MEMBER_TO_BOARD_URL + boardId,
    { email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function removeMember(boardId, email, token) {
  return axios.put(
    URLs.REMOVE_MEMBER_FROM_BOARD_URL + boardId,
    { email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function changeMemberRole(boardId, email, role, token) {
  return axios.put(
    URLs.CHANGE_MEMBER_ROLE_URL + boardId,
    { email, role },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function changeListName(data, token) {
  const { boardId, listId, newName } = data;
  return axios.put(
    URLs.CHANGE_LIST_NAME_URL,
    { boardId, listId, newName },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function addLabel(boardId, data, token) {
  return axios.post(URLs.ADD_LABEL_TO_BOARD_URL + boardId, data, {
    headers: {
      Authorization: token,
    },
  });
}
