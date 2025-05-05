import { Navigate , Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {

    const {loading, isAuthenticated}  = useAuth() // usamos el hook useAuth para obtener el estado de loading y isAuthenticated del contexto de autenticacion 
    
    if (loading) return <h1>Loading...</h1> // si la aplicacion esta cargando, mostramos un mensaje de carga

    if(!loading && !isAuthenticated) return <Navigate to='/login' replace /> // si el usuario no esta autenticado, lo redirigimos a la pagina de login, replace es una propiedad que nos permite reemplazar la ruta actual por la nueva ruta, en este caso la ruta de login
  return (
    <Outlet /> // Outlet es un componente que se usa para renderizar el contenido de las rutas hijas, en este caso las rutas protegidas
  )
}

export default ProtectedRoute