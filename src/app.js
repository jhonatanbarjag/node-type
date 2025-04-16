import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // Middleware para convertir el body a json
app.use(cookieParser()); // Middleware para convertir las cookies a json

app.use("/api",authRoutes); // Middleware para las rutas de autenticación
app.use("/api",taskRoutes); // Middleware para las rutas de tareas

export default app;