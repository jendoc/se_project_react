const location = { latitude: "45.512794", longitude: "-122.679565" };
const APIKey = "d642f7f8902d23e433a4131cca346dd4";
const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
  Accept: "application/json",
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export { location, APIKey, baseUrl, headers, emailRegex };
