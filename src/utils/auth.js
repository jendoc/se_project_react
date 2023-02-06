import { baseUrl, headers } from "./constants";

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {
    throw new Error("Invalid email or password");
  } else if (res.status === 409) {
    throw new Error("User already exists");
  }
};

export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkRes);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:3000",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};
