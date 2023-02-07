import { baseUrl, headers } from "./constants";

export const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

// const checkRes = (res) => {
//   if (res.ok) {
//     return res.json();
//   } else if (res.status === 401) {
//     throw new Error("Invalid email or password");
//   } else if (res.status === 409) {
//     throw new Error("User already exists");
//   }
// };

export const register = (name, avatar, email, password) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const login = (email, password) => {
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify({ email, password }),
  })
  .then((data) => {
    localStorage.setItem('token', data.token)
  })
  .then(handleServerResponse)
};

export const authorize = () => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:3000",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
