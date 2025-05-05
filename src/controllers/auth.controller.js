import { json } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  console.log(req.body);  // para ver los datos en la consola
  const { username, email, password } = req.body; // destructuramos el body para obtener los datos del usuario

  try {
    const userFound = await User.findOne({ email }); // buscamos el usuario por email
    if (userFound) return res.status(400).json(["the email is already in use"]); // si ya existe devolvemos un error 400 

    const passwordHash = await bcrypt.hash(password, 10); // encriptamos la contraseña con bcryptjs, el segundo parametro es el numero de veces que se va a encriptar la contraseña

    const newUser = new User({ // creamos un nuevo usuario
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); // guardamos el usuario en la base de datos
    const token = await createAccessToken({ id: userSaved._id }); // creamos un token de acceso con el id del usuario guardado

    res.cookie("token", token); // guardamos el token en una cookie
    // la cookie se guarda en el navegador y se envia en cada peticion al servidor
    res.json({ // devolvemos el usuario guardado
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) { // si hay un error devolvemos un error 500
    res.status(500).json({message: error.message}); // devolvemos el error en formato json
  }
};


export const login = async (req, res) => {
    const {  email, password } = req.body; // destructuramos el body para obtener los datos del usuario
  
    try {
      const userFound = await User.findOne({ email });  // buscamos el usuario por email
      if (!userFound) return res.status(400).json({message: "User not found"}); // si no lo encontramos devolvemos un error 400

      const isMatch = await bcrypt.compare(password, userFound.password); // comparamos la contraseña ingresada con la contraseña guardada en la base de datos
        if (!isMatch) return res.status(400).json({message: "Incorrect password"}); // si no coinciden devolvemos un error 400
  
      const token = await createAccessToken({ id: userFound._id }); // creamos un token de acceso con el id del usuario encontrado
  
      res.cookie("token", token); // guardamos el token en una cookie
      // la cookie se guarda en el navegador y se envia en cada peticion al servidor
      res.json({ // devolvemos el usuario encontrado
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    } catch (error) { // si hay un error devolvemos un error 500
      res.status(500).json({message: error.message}); // devolvemos el error en formato json
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", { // borramos la cookie
        expires: new Date(0), // la fecha de expiracion es 0
    });
    res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id) // buscamos el usuario por id

    if (!userFound) return res.status(400).json({message: "User not found"}); // si no lo encontramos devolvemos un error 400
    // si lo encontramos devolvemos el usuario
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies; // obtenemos el token de la cookie

  if (!token) return res.sendStatus(401).json({message: "Unauthorized"}); // si no hay token devolvemos un error 401

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401).json({message: "Unauthorized"}); // si el token no es valido devolvemos un error 401

    const userFound = await User.findById(user.id); // buscamos el usuario por id
    if (!userFound) return res.sendStatus(401).json({message: "Unauthorized"}); // si no lo encontramos devolvemos un error 401

    return  res.json({ // devolvemos el usuario encontrado
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  }) // verificamos el token con jwt.verify, el primer parametro es el token, el segundo es la clave secreta y el tercero es una funcion de callback que se ejecuta cuando se verifica el token
  // si el token es valido, se ejecuta la funcion de callback y se le pasa el error y el usuario decodificado

}