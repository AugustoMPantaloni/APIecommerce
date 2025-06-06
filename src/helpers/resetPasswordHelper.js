const transporter = require("../config/mailer")

async function recoverPasswordEmail(user, tokenPassword){
    try {  
        const info = await transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to: user.email,
            subject:"Reset Password",
            html: `
                <h2>Hola ${user.name}!</h2>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en [Nombre de App].</p>
                <p>Para continuar, haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${process.env.FRONTEND_URL}/api/auth/resetPassword/${tokenPassword}">Recuperar contraseña</a>
                <p>Si no solicitaste este cambio, ignora este correo.</p>
                <p>¡Gracias por confiar en nosotros!<br>
                Saludos,<br>
                El equipo de [Nombre de la App]</p>
            `
        })
        return info;
    } catch (error) {
        console.error("Error sending email to recover password", error)
        throw error;
        
    }
}

module.exports = recoverPasswordEmail