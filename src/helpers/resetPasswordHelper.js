const transporter = require("../config/mailer")

async function recoverPasswordEmail(user){
    try {  
        const info = await transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to: user.email,
            subject:"Reset Password",
            html:`
            <h2>Hola ${user.name}!</h2>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en [Nombre de App].</p>
            <p>Para continuar, haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <a href ="">Recuperar contraseña</a>
            <h3>
                ¡Gracias por confiar en nosotros!
                Saludos,
                El equipo de [Nombre de tu App]
            </h3>
            `
        })
        return info;
    } catch (error) {
        console.error("Error sending email to recover password", error)
        throw error;
        
    }
}

module.exports = recoverPasswordEmail