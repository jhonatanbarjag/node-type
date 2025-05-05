import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react"; // importamos el hook useEffect para ejecutar una funcion cuando el componente se monta
import { useNavigate , Link } from "react-router-dom";

function RegisterPage(){

    const{register, handleSubmit , formState:{errors}} = useForm() // usamos el hook useForm para manejar el formulario, register es una funcion que nos permite registrar los inputs del formulario, handleSubmit es una funcion que nos permite manejar el evento de submit del formulario, formState es un objeto que contiene el estado del formulario y errors es un objeto que contiene los errores de validacion del formulario
    const {signup , isAuthenticated , errors: registerErrors} = useAuth(); 
    const navigate = useNavigate(); // usamos el hook useNavigate para redirigir al usuario a otra pagina

    useEffect(() => { 
        if(isAuthenticated) navigate("/tasks"); // si el usuario esta autenticado, lo redirigimos a la pagina de tareas
    }, [isAuthenticated]); // el segundo argumento es un array de dependencias, si isAuthenticated cambia, se ejecuta la funcion

    const onSubmit = handleSubmit( async(values) => {  // onSubmit es una funcion que se ejecuta cuando se envía el formulario, handleSubmit es una funcion que nos permite manejar el evento de submit del formulario
        signup(values); // llamamos a la funcion signup del contexto de autenticacion y le pasamos los valores del formulario
    });
    return(
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error,i ) => (  // recorremos el array de errores y mostramos cada error en un div con un fondo rojo y texto blanco
                    
                        <div className="bg-red-500 p-2 text-white" key={i}> 
                        {error}
                    </div>
                )
                    
                )
            }
            <form onSubmit={onSubmit}> {/* onSubmit es una función que se ejecuta cuando se envía el formulario. */}
            <input type="text" {...register("username", {required:true})} // register es una función que nos permite registrar los inputs del formulario.
            // {...register("username", {required:true})} es una forma de registrar el input y validar que sea requerido.   
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
             /> 
             {
                errors.username && <p className="text-red-500"> username is required</p> // si hay un error en el input username, mostramos un mensaje de error  
             }
            <input type="email" {...register("email", {required:true})} // register es una función que nos permite registrar los inputs del formulario.
            // {...register("email", {required:true})} es una forma de registrar el input y validar que sea requerido.
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
            />
            {
                errors.email && <p className="text-red-500">Email is required</p> // si hay un error en el input email, mostramos un mensaje de error  
             }
            <input type="password" {...register("password", {required:true})}// register es una función que nos permite registrar los inputs del formulario.
            // {...register("confirmPassword", {required:true})} es una forma de registrar el input y validar que sea requerido.
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            />
            {
                errors.password && <p className="text-red-500">Password is required</p> // si hay un error en el input password, mostramos un mensaje de error  
             }   
            <button type="submit">Register</button> 

            </form>
             <p className="flex gap-x-2 justify-between mt-4">
                Already have an account ? <Link to= "/login" className="text-sky-500"> Login </Link>
            </p>
             
        </div>
    )
}

export default RegisterPage