import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/tasks.controller.js';

import { validateSchema } from '../middlewares/validator.middleware.js'; // middleware para validar el schema
import { createTaskSchema } from '../schemas/task.schema.js'; // importamos el schema de task.schema.js


const router = Router();

router.get("/tasks", authRequired, getTasks); // el middleware authRequired se encarga de verificar si el usuario esta autenticado

router.get("/tasks/:id", authRequired, getTask ); // el middleware authRequired se encarga de verificar si el usuario esta autenticado

router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask); // el middleware authRequired se encarga de verificar si el usuario esta autenticado y luego vamos a validar el schema con el middleware validateSchema y luego el controlador se encarga de crear la tarea
// el middleware validateSchema se encarga de validar el schema antes de pasar al controlador

router.delete("/tasks/:id", authRequired, deleteTask); // el middleware authRequired se encarga de verificar si el usuario esta autenticado y luego el controlador se encarga de eliminar la tarea

router.put("/tasks/:id", authRequired,updateTask ); // el middleware authRequired se encarga de verificar si el usuario esta autenticado y luego el controlador se encarga de actualizar la tarea


export default router;