import axios from "./axios";


export const registerRequest = (user) => axios.post(`/register`, user); // hacemos la peticion al servidor para registrar un usuario, el segundo parametro es el body de la peticion, en este caso el usuario

export const loginRequest = (user) => axios.post(`/login`, user); // hacemos la peticion al servidor para iniciar sesion, el segundo parametro es el body de la peticion, en este caso el usuario

export const verifyTokenRequet = () => axios.get(`/verify`); // hacemos la peticion al servidor para verificar si el usuario esta autenticado, no necesitamos pasarle un body porque es una peticion GET y no necesita un body
