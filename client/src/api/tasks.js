import axios from './axios';

export const getTasksRequest = () => axios.get('/tasks'); // funcion para obtener las tareas, hace una peticion GET a la api de tareas
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`); // funcion para obtener una tarea, hace una peticion GET a la api de tareas con el id de la tarea

export const createTaskRequest = (task) => axios.post('/tasks', task); // funcion para crear una tarea, hace una peticion POST a la api de tareas

export const updateTaskRequest = (task) => axios.put(`/tasks/${task._id}`, task); // funcion para actualizar una tarea, hace una peticion PUT a la api de tareas con el id de la tarea y los datos de la tarea

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`); // funcion para eliminar una tarea, hace una peticion DELETE a la api de tareas con el id de la tarea

