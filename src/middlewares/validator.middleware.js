export const validateSchema = (schema) => (req, res, next) => { // middleware para validar el schema
    try {
         schema.parse(req.body); // validamos el schema con el body de la peticion
        next(); // si el schema es valido, pasamos al siguiente middleware
    } catch (error) { 
        console.log(error.erros); // si el schema no es valido, mostramos el error en consola
        return res.status(400).json({error: error.errors.map(error => error.message)}); // devolvemos un error 400 con el mensaje de error
    }
}