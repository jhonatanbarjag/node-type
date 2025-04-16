import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => { // middleware para verificar si el usuario esta autenticado
    // el middleware se encarga de verificar si el usuario esta autenticado
    const {token} = req.cookies; // obtenemos el token de las cookies
    
    if (!token) // si no hay token devolvemos un error 401
        return res.status(401).json({ message: "No token, autorizacion denegada" }); // si no hay token devolvemos un error 401

        jwt.verify(token, TOKEN_SECRET, (err, user) => { // verificamos el token
            if (err) return res.status(403).json({ message: "Token is not valid" }); // si el token no es valido devolvemos un error 403
        // si el token es valido, guardamos el id del usuario en la peticion
            
            req.user = user; // guardamos el id del usuario en la peticion


        next();
        })
    
}