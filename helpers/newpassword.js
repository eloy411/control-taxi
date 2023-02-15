const Cliente = require('../models/cliente')
const Conductor = require('../models/conductor')
const { getTemplatePassword, sendEmail } = require('../config/mail.config')
const { generateAccessToken, decodeToken } = require('../helpers/webtoken');

const newpassword = {}


newpassword.sendLinkNewPassword =async (req,res)=>{
    
    const user = await Cliente.findOne({ email: req.body.email})
    var rol = 'cliente'
    if(!user){
        const user = await Conductor.findOne({ email: req.body.email})
        var rol = 'conductor'
        if(!user){
            return res.send({message:'el email no esta registrado', error:900})
        }
    }
    res.send({message:rol,error:0})
    const accessToken = generateAccessToken(req.body.email);
    const template = getTemplatePassword(user.nombre,rol, accessToken)
    await sendEmail(req.body.email, 'Nueva contraseña', template)

}

module.exports = newpassword