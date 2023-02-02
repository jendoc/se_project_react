import { baseUrl, headers } from "./constants";

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItems = async () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: headers,
  });
};

const addItem = async (name, imageUrl, weather, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = async (id, token) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { getItems, addItem, deleteItem };
