import {useForm} from "react-hook-form"; // importamos useForm de react-hook-form para manejar el formulario
import {useAuth } from "../context/AuthContext"; // importamos el contexto de autenticacion para usar la funcion signin
import { Link } from "react-router-dom";


function LoginPage() {
  const {register, handleSubmit , formState:{errors}} = useForm() 

  const {signin, errors:signinErrors} = useAuth(); // usamos el hook useAuth para obtener la funcion signin del contexto de autenticacion

  const onSubmit = handleSubmit((data) => {
    signin(data); // llamamos a la funcion signin del contexto de autenticacion y le pasamos los datos del formulario
  })

return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center"> 
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

    {
                signinErrors.map((error,i ) => (  // recorremos el array de errores y mostramos cada error en un div con un fondo rojo y texto blanco
                        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}> 
                        {error}
                    </div>
                ))
            }

    <h1 className="text-2xl font-bold ">Login</h1> {/* mostramos un titulo en el centro de la pagina */}

    <form onSubmit={onSubmit}> {/* onSubmit es una función que se ejecuta cuando se envía el formulario. */}
            
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
            <button type="submit">Login</button> 

            </form>
            <p className="flex gap-x-2 justify-between mt-4">
              Dont have an account? <Link to= "/register" className="text-sky-500"> sign up </Link>
            </p>

    </div>


    </div>
  )
}

export default LoginPage