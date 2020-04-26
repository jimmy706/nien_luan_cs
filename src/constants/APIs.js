import { BASE_URL } from "./_global-vars";

export const CREATE_ACCOUNT_URL = `${BASE_URL}/user/create-account`;
export const LOGIN_URL = `${BASE_URL}/user/login`;
export const LOGIN_WITH_OAUTH_URL = `${BASE_URL}/user/login-with-oauth`;

export const GET_BOARDS_URL = `${BASE_URL}/boards/`;
export const CREATE_BOARD_URL = `${BASE_URL}/boards/create`;
export const DELETE_BOARD_URL = `${BASE_URL}/boards/delete`;
export const GET_BOARD_DETAIL_URL = `${BASE_URL}/boards/detail`;
export const ADD_NEW_LIST_URL = `${BASE_URL}/boards/add-list`;