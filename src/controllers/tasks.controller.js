import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ // buscamos las tareas en la base de datos
        user: req.userId // solo las tareas del usuario que esta logueado
    }).populate('user') // populate para obtener el username del usuario que creo la tare
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const { title,description, date } = req.body // destructuramos el body de la peticion
    const newTask = new Task({ // el id del usuario que creo la tarea)
        title,
        description,
        date,
        user: req.userId // guadraremos el id del usuario que creo la tarea
    })
    const savedTask = await newTask.save() // guardamos la tarea en la base de datos
    res.json(savedTask) // devolvemos la tarea guardada
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user') // buscamos la tarea por id y populamos el usuario
    if (!task) return res.status(404).json({ message: "Task not found" }) // si no existe la tarea devolvemos un error 404
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    return res.sendStatus(204) // devolvemos un 204 si la tarea fue eliminada
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}


