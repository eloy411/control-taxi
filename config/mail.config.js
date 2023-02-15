const nodemailer = require('nodemailer')
const mailer = {}
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    tls:{
        rejectUnauthorized: false
    },
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'emaildepruebaseloy@gmail.com', // generated ethereal user
      pass: 'ytgeejvgeuihzrtn', // generated ethereal password
    },
  });

  mailer.sendEmail = async (email,subject,html) =>{
    try {
        await transporter.sendMail({
            from: '"Control-Taxi 👻"', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "ControlTaxi te saluda", // plain text body
            html, // html body
          });
        
    } catch (error) {
        return 'algo no va bien con el email'
    }
  }


  mailer.getTemplate = (nombre,rol,token) =>{ 
    return `
    <h2> Hola ${nombre}!!</h2>
    <p>para confirmar tu email debes clicar en este enlace--->>></p>
    <br>
    <a href=
      "https://check411.herokuapp.com/api/${rol}/confirm/${token}" > CONFIRMAR CUENTA

        </a>
    `
  }

  mailer.getTemplatePassword = (nombre,rol,token) =>{
    return `
    <h2> Hola ${nombre}!!</h2>
    <p>para cambiar tu contraseña debes clicar en este enlace--->>></p>
    <br>
    <a href=
      "https://check411.herokuapp.com/api/${rol}/newpassword/${token}" > NUEVA CONTRASEÑA

        </a>
    `
  }
  
  module.exports = mailer

