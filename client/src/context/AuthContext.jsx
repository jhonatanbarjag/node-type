import { createContext, useState, useContext, useEffect } from "react";  
import { registerRequest, loginRequest , verifyTokenRequet } from "../api/auth"
import Cookies from "js-cookie"; // importamos la libreria js-cookie para manejar las cookies en el navegador

export const AuthContext = createContext(); // creamos un contexto de autenticacion, el contexto es una forma de compartir datos entre componentes sin tener que pasarlos como props manualmente a cada componente

export const useAuth = () => { // creamos un hook personalizado para usar el contexto de autenticacion
    const context = useContext(AuthContext); // usamos el hook useContext para obtener el contexto de autenticacion
    if (!context){
        // si el contexto no existe, lanzamos un error
        throw new Error("useAuth must be used within an AuthProvider"); // lanzamos un error si el contexto no existe
    } 
    return context; // retornamos el contexto
}

export const AuthProvider = ({ children }) => { // creamos un proveedor de autenticacion
    const [user, setUser] = useState(null); // creamos un estado para guardar el usuario, por defecto es null
    const [isAuthenticated, setIsAuthenticated] = useState(false); // creamos un estado para guardar si el usuario esta autenticado, por defecto es false
    const [errors, setErrors] = useState([]); // creamos un estado para guardar los errores, por defecto es un array vacio
    const [loading, setLoading] = useState(true); // creamos un estado para guardar si la aplicacion esta cargando, por defecto es true

    const signup = async (user) => { // creamos una funcion para registrar un usuario
       try {
        const res = await registerRequest(user); // hacemos la peticion al servidor para registrar el usuario
        console.log(res.data); // mostramos la respuesta en la consola
        setUser(res.data); // guardamos el usuario en el estado
        setIsAuthenticated(true); // cambiamos el estado de autenticacion a true 
        } catch (error) { // si hay un error, lo mostramos en la consola
            console.log(error.response); // mostramos el error en la consola
            setErrors(error.response.data); // guardamos el error en el estado
        }
    }

    const signin = async (user) => { // creamos una funcion para iniciar sesion
        try {
            const res = await loginRequest(user);
            console.log(res)
            setIsAuthenticated(true); // cambiamos el estado de autenticacion a true
            setUser(res.data); // guardamos el usuario en el estado
        } catch (error) { // si hay un error, lo mostramos en la consola
            if (Array.isArray(error.response.data)){ // si el error es un array, lo guardamos en el estado
               return setErrors(error.response.data); // guardamos el error en el estado
            }
            setErrors([error.response.data.message]); // si el error no es un array, lo guardamos en el estado como un array con un solo elemento
        }
    }


    useEffect(() => { 
        if (errors.length > 0) { // si hay errores, los mostramos en la consola
            const timer = setTimeout(() => { // usamos setTimeout para borrar los errores despues de 3 segundos
                setErrors([]); // borramos los errores
            }, 5000); // esperamos 5 milisegundos antes de borrar los errores
            return () => clearTimeout(timer); // limpiamos el timer cuando el componente se desmont
        } 
        
    },[errors])

    useEffect(() => { 

        async function checkLogin(){
            const cookies = Cookies.get();
        

        if (!cookies.token){
            setIsAuthenticated(false); // si no hay cookie, cambiamos el estado de autenticacion a false
            setLoading(false); // cambiamos el estado de loading a false
            return setUser(null); // borramos el usuario del estado
        }
            try{
                const res = await verifyTokenRequet(cookies.token); // hacemos la peticion al servidor para verificar si el usuario esta autenticado
                if (!res.data) {
                    setIsAuthenticated(false); // si no hay respuesta, cambiamos el estado de autenticacion a false
                    setLoading(false); // cambiamos el estado de loading a false
                    return;
                }

                setIsAuthenticated(true); // si hay respuesta, cambiamos el estado de autenticacion a true
                setUser(res.data); // guardamos el usuario en el estado
                setLoading(false); // cambiamos el estado de loading a false
            }catch (error) {
                console.log(error); // mostramos el error en la consola
                setIsAuthenticated(false); // si hay un error, cambiamos el estado de autenticacion a false
                setUser(null); // borramos el usuario del estado
                setLoading(false); // cambiamos el estado de loading a false
        }
        }
        checkLogin(); // llamamos a la funcion checkLogin para verificar si el usuario esta autenticado
    }, [])

    return ( // retornamos el proveedor de autenticacion
        <AuthContext.Provider value={{ // creamos un proveedor de autenticacion
            signup, // pasamos la funcion signup al contexto para que pueda ser utilizada en otros componentes
            signin, // pasamos la funcion signin al contexto para que pueda ser utilizada en otros componentes
            loading, // pasamos el estado de loading al contexto para que pueda ser utilizado en otros componentes
            user, // pasamos el usuario al contexto para que pueda ser utilizado en otros componentes
            isAuthenticated, // pasamos el estado de autenticacion al contexto para que pueda ser utilizado en otros componentes y para saber si el usuario esta autenticado o no
            errors, // pasamos el error al contexto para que pueda ser utilizado en otros componentes

        }}>
            {children} {/* renderizamos los hijos del proveedor de autenticacion */}
        </AuthContext.Provider> 
    )
}