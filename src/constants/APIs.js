import { BASE_URL } from "./_global-vars";

export const CREATE_ACCOUNT_URL = `${BASE_URL}/user/create-account/`;
export const LOGIN_URL = `${BASE_URL}/user/login/`;
export const LOGIN_WITH_OAUTH_URL = `${BASE_URL}/user/login-with-oauth/`;

export const GET_BOARDS_URL = `${BASE_URL}/boards/all/`;
export const CREATE_BOARD_URL = `${BASE_URL}/boards/create/`;
export const CHANGE_BOARD_NAME_URL = `${BASE_URL}/boards/change-name/`;
export const CHANGE_BOARD_THEME = `${BASE_URL}/boards/change-theme/`;
export const DELETE_BOARD_URL = `${BASE_URL}/boards/delete/`;
export const GET_BOARD_DETAIL_URL = `${BASE_URL}/boards/detail/`;
export const ADD_NEW_LIST_URL = `${BASE_URL}/boards/add-list/`;
export const CHANGE_LIST_NAME_URL = `${BASE_URL}/boards/change-list-name`;
export const DELETE_LIST_URL = `${BASE_URL}/boards/delete-list`;
export const ADD_MEMBER_TO_BOARD_URL = `${BASE_URL}/boards/add-member/`;
export const REMOVE_MEMBER_FROM_BOARD_URL = `${BASE_URL}/boards/remove-member/`;
export const CHANGE_MEMBER_ROLE_URL = `${BASE_URL}/boards/change-role/`;
export const ADD_LABEL_TO_BOARD_URL = `${BASE_URL}/boards/add-label/`;
export const REMOVE_LABEL_URL = `${BASE_URL}/boards/remove-label/`;
export const UPDATE_LABEL_URL = `${BASE_URL}/boards/update-label/`;

export const ADD_CARD = `${BASE_URL}/cards/create/`;
export const LIST_CARD = `${BASE_URL}/cards/`;
export const DELETE_CARD = `${BASE_URL}/cards/delete/`;
export const GET_CARD_DETAIL = `${BASE_URL}/cards/detail/`;
export const UPDATE_CARD_DESC = `${BASE_URL}/cards/update/desc/`;
export const UPDATE_CARD_TITLE = `${BASE_URL}/cards/update/title/`;
export const UPDATE_CARD_DUE_DATE = `${BASE_URL}/cards/update/due-date/`;
export const ADD_LABEL_TO_CARD = `${BASE_URL}/cards/update/labels/add/`;
export const REMOVE_LABEL_FROM_CARD = `${BASE_URL}/cards/update/labels/remove/`;
export const UPDATE_MEMBERS_FOR_CARD = `${BASE_URL}/cards/update/members/`;
export const ADD_CHECKLIST = `${BASE_URL}/cards/update/checklist/add/`;
export const UPDATE_CHECKLIST = `${BASE_URL}/cards/update/checklist/update/`;
export const REMOVE_CHECKLIST = `${BASE_URL}/cards/update/checklist/remove/`;

export const SEARCH_USER = `${BASE_URL}/user/mail`;
