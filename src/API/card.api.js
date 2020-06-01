import axios from "axios";
import * as URLs from "../constants/APIs";

export function listCard(listId) {
  return axios.get(URLs.LIST_CARD + listId);
}

export function addNewCard(listId, cardTitle) {
  return axios.post(URLs.ADD_CARD + listId, { cardTitle });
}

export function updateCardDescription(cardId, description, token) {
  return axios.put(
    URLs.UPDATE_CARD_DESC + cardId,
    { description },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function changeCardTitle(cardId, cardTitle, token) {
  return axios.put(
    URLs.UPDATE_CARD_TITLE + cardId,
    { cardTitle },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function updateCardDueDate(cardId, dueDate, token) {
  return axios.put(
    URLs.UPDATE_CARD_DUE_DATE + cardId,
    { dueDate },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function removeCard(cardId, token) {
  return axios.delete(URLs.DELETE_CARD + cardId, {
    headers: {
      Authorization: token,
    },
  });
}

export function addLabel(cardId, labelId, token) {
  return axios.put(
    URLs.ADD_LABEL_TO_CARD + cardId,
    { labelId },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function removeLabel(cardId, labelId, token) {
  return axios.put(
    URLs.REMOVE_LABEL_FROM_CARD + cardId,
    { labelId },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function updateMembers(cardId, members, token) {
  return axios.put(
    URLs.UPDATE_MEMBERS_FOR_CARD + cardId,
    { members },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

export function addCheckList(cardId, checklistName, token) {
  return axios.put(
    URLs.ADD_CHECKLIST + cardId,
    { checklistName },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
