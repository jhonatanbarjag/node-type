import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
// Middleware para permitir el acceso a la API desde otros dominios
app.use(cors({ 
    origin: 'http://localhost:5173', // Cambia esto por el dominio de tu cliente
    credentials: true, // Permitir el uso de cookies
})); 
app.use(morgan('dev')); // Middleware para registrar las peticiones en la consola
app.use(express.json()); // Middleware para convertir el body a json
app.use(cookieParser()); // Middleware para convertir las cookies a json

app.use("/api",authRoutes); // Middleware para las rutas de autenticación
app.use("/api",taskRoutes); // Middleware para las rutas de tareas

export default app;