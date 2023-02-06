import { baseUrl, headers } from "./constants";

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const getItems = (token) => {
  return request(`${baseUrl}/items`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:3000",
      authorization: `Bearer ${token}`,
    }
  });
};

export const addItem = (name, imageUrl, weather, token) => {
  return request(`${baseUrl}/items`, {
    mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:3000",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const deleteItem = (id, token) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:3000",
      authorization: `Bearer ${token}`,
    }
  });
};

export const addCardLike = (id, token) => {};

export const removeCardLike = (id, token) => {};
