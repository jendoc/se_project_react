const baseUrl = "https://my-json-server.typicode.com/jendoc/se_project_react";
const headers = {
  "Content-Type": "application/json",
};

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

const addItem = async (name, imageUrl, weather) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = async (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  });
};

export { getItems, addItem, deleteItem };
