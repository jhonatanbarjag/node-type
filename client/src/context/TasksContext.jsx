import { createContext ,useContext, useState } from "react";
import { createTaskRequest } from "../api/tasks"; 


const TaskContext = createContext(); // creamos un contexto de tareas, el contexto es una forma de compartir datos entre componentes sin tener que pasarlos como props manualmente a cada componente

export const  useTasks = () => {
    const context = useContext(TaskContext); // usamos el hook useContext para obtener el contexto de tareas
    if (!context){ // si el contexto no existe, lanzamos un error
        throw new Error("useTasks must be used within a TaskProvider"); // lanzamos un error si el contexto no existe
    } 
    return context; // retornamos el contexto
}
    
export function TaskProvider({ children }) { // creamos un proveedor de tareas
        const   [tasks, setTasks] = useState([]); // creamos un estado para guardar las tareas, por defecto es un array vacio
        const createTask = async (task) => { // creamos una funcion para crear una tarea
            const res = await createTaskRequest(task); // hacemos una peticion a la api para crear una tarea, el segundo parametro es el body de la peticion, en este caso la tarea
            console.log(res); // mostramos la respuesta en la consola
            
            
        }
        return (
            <TaskContext.Provider 
            value={{
            tasks,
            createTask
            }}
            >
            {children} {/* devolvemos el proveedor de tareas con el valor que le pasamos, en este caso es un objeto vacio */}
            </TaskContext.Provider> // devolvemos el proveedor de tareas
        )
    }