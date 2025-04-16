import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

import { validateSchema } from "../middlewares/validator.middleware.js"; // middleware para validar el schema
// el middleware validateSchema se encarga de validar el schema antes de pasar al controlador
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"; // importamos los schemas de auth.schema.js
// importamos los schemas de auth.schema.js

const router = Router();

// definimos el router de express
// el router de express se encarga de manejar las rutas de la aplicacion
router.post("/register" , validateSchema(registerSchema), register); // registro de usuario con validacion de schema
router.post("/login" ,validateSchema(loginSchema), login); // login con validacion de schema
router.post("/logout", logout) // logout
// el logout no necesita validacion de schema porque no se envia nada en el body
router.get("/profile", authRequired, profile ) // perfil del usuario autenticado con el middleware authRequired
// el middleware authRequired se encarga de verificar si el usuario esta autenticado

export default router;