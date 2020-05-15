import { BASE_URL } from "./_global-vars";

export const CREATE_ACCOUNT_URL = `${BASE_URL}/user/create-account/`;
export const LOGIN_URL = `${BASE_URL}/user/login/`;
export const LOGIN_WITH_OAUTH_URL = `${BASE_URL}/user/login-with-oauth/`;

export const GET_BOARDS_URL = `${BASE_URL}/boards/all/`;
export const CREATE_BOARD_URL = `${BASE_URL}/boards/create/`;
export const DELETE_BOARD_URL = `${BASE_URL}/boards/delete/`;
export const GET_BOARD_DETAIL_URL = `${BASE_URL}/boards/detail/`;
export const ADD_NEW_LIST_URL = `${BASE_URL}/boards/add-list/`;
export const CHANGE_LIST_NAME_URL = `${BASE_URL}/boards/change-list-name`;
export const DELETE_LIST_URL = `${BASE_URL}/boards/delete-list`;

export const ADD_CARD = `${BASE_URL}/cards/create/`;
export const LIST_CARD = `${BASE_URL}/cards/`;