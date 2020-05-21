import axios from "axios";
import * as URLs from "../constants/APIs";

export function searchUser(query) {
  const { email, limit = 6 } = query;
  return axios.get(`${URLs.SEARCH_USER}?q=${email}&limit=${limit}`);
}
