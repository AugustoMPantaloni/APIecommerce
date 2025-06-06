const transporter = require ("../config/mailer")

async function verifyEmail (user, tokenEmail) {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to: user.email,
            subject: "Account verification",
            html: `
        <h2>Hola ${user.name}! bienvenido a [Nombre de la app] </h2>
        <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/api/auth/verify/${tokenEmail}">Verificar cuenta</a>
        <p>Si no solicitaste esto, podés ignorar este correo.</p>
        `
        })
        return info;
    } catch (error) {
        console.error("Error sending verification email", error)
        throw error;
    }
}

module.exports = verifyEmail

