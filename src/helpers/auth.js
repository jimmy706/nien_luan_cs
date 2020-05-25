import axios from "axios";
import Cookies from "js-cookie";

export function setToken(token, exp) {
  localStorage.setItem("jwtToken", JSON.stringify({ token, expire: exp }));
  Cookies.set("jwt", token, { expires: 1 });
  axios.defaults.headers.common["Authorization"] = token;
}

export function isAuth() {
  const jwt = JSON.parse(localStorage.getItem("jwtToken"));
  if (!jwt) {
    return false;
  }
  const now = new Date().getTime();
  const result = now < jwt.expire;
  if (result) {
    axios.defaults.headers.common["Authorization"] = jwt.token;
    return true;
  }
  return false;
}

export function getAuth() {
  if (isAuth()) {
    return JSON.parse(localStorage.getItem("jwtToken"));
  }
  return null;
}

export function removeAuthToken() {
  localStorage.removeItem("jwtToken");
  delete axios.defaults.headers.common["Authorization"];
  Cookies.remove("jwt");
}

export function checkCurrentIsAdmin(board, user) {
  if (!board) {
    return false;
  }
  const currentUser = board.members.find((mem) => mem.email === user.email);
  return currentUser ? currentUser.role === "ADMIN" : false;
}
