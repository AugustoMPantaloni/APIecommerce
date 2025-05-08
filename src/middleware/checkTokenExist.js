/*
    - Middleware que verifica si el cliente tiene un token válido en las cookies firmadas.
    Se utiliza para personalizar el mensaje de error cuando un usuario intenta acceder a
    rutas protegidas sin haber iniciado sesión o sin haberse registrado.
    - Si no se encuentra el token, se pasa un error personalizado al manejador de errores global.
*/
const checkTokenExists = (req, res, next) => {
    const token = req?.signedCookies?.token;

    if (!token) {
        return next(new Error("You need to be logged in or registered"));
    }

    next();
};

module.exports = checkTokenExists;
