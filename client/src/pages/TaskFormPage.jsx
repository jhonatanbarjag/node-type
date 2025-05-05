import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext" // importamos el hook useTasks para obtener el contexto de tareas;

function TaskFormPage() {
    const { register , handleSubmit }= useForm();
    const {createTask} = useTasks(); // usamos el hook useTasks para obtener el contexto de tareas
    
    const onSubmit = handleSubmit((data) => {
        console.log(data); // mostramos los datos del formulario en la consola
        createTask(data); // llamamos a la funcion createTask con los datos del formulario
    })
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" {...register("title")} className="w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2" autoFocus />

            <textarea placeholder="description" {...register("description")} className="w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2" rows="3"></textarea>

            <button>save</button>

        </form>
    </div>
  )
}

export default TaskFormPage