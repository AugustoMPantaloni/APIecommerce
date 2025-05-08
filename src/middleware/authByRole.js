/*
    Middleware para autenticar usuarios basado en su rol.
    Recibe un rol como parámetro (por defecto "user") y verifica si el usuario tiene 
    permisos para acceder a la ruta protegida. 
    Si el usuario no está autenticado o no tiene el rol adecuado, se devuelve un error.
    Si la autenticación es exitosa, se agrega el usuario al objeto `req.user` y permite
    que continúe al siguiente middleware o controlador.
*/

const passport = require("passport");

function authByRole(role = "user") {
    return (req, res, next) => {
        passport.authenticate(role, { session: false }, (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                const message = info?.message || "Unauthorized";
                return next(new Error(message));
            }

            req.user = user;
            next();
        })(req, res, next);
    };
}

module.exports = authByRole;
