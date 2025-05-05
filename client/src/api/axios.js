import axios from "axios";

const instance= axios.create({
  baseURL: "http://localhost:3002/api", // URL base de la API
  withCredentials: true, // habilitamos el uso de cookies
});

export default instance;