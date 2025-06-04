const nodemailer =  require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
    }
})


const sendEmail = async (email) =>{
    try{


    }catch(error){

    }
}


module.exports = transporter