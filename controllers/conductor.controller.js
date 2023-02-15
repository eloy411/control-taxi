const Conductor = require('../models/conductor')
const { getTemplate, sendEmail } = require('../config/mail.config')
const { generateAccessToken, decodeToken } = require('../helpers/webtoken');


const conductorController = {}



conductorController.singupConductor = async (req, res) => {
    const { rol, licencia,matricula,nombre, apellido, telefono, email, password } = req.body
    console.log(req.body)


    const emailConductor = await Conductor.findOne({ email: email })
    if (!emailConductor) {

        const accessToken = generateAccessToken(email);
        const template = getTemplate(nombre, rol, accessToken)

        const response = await sendEmail(email, 'El fuckin Eloy nene', template)

        if (!response) {
            newConductor = new Conductor({ nombre,licencia,matricula, apellido, telefono, email, password })
            newConductor.password = await newConductor.encryptPassword(password)
            await newConductor.save();
            res.send({ message: 'registrado, revisa tu email y confirma!', error: 0 })//ok
            
        }else{
            res.send({ message: response, error: 8 })
        }

    } else {
        res.send({ message: 'este usuario ya existe', error: 2 })//usuario ya existente
    }
}


conductorController.confirmEmailConductor = async (req, res) => {
    const { token } = req.params
    const data = decodeToken(token)
    if (data?.email) {
        const conductor = await Conductor.findOneAndUpdate({ email: data.email }, {
            estado: 'autorizado'
        }, {
            new: true
        })
        console.log(conductor)
    } else {
        res.render('fail')
    }
    res.render('confirm')
}


conductorController.singinConductor = async (req, res) => {
    email = req.body.email
    password = req.body.password
    rol = req.body.rol
    const conductor = await Conductor.findOne({ email })
    
    if (conductor) {
        if (conductor.estado == 'autorizado') {
            const match = await conductor.matchPassword(password)
            
            if (match) {
                const accessToken = generateAccessToken(email);
                
                res.header('authorization', accessToken)
                res.send({ error: 0, token: accessToken, id: conductor.id, rol: rol})
            } else {
                res.send({ message: 'email o contraseña incorrectos', error: 4 })
            }
        } else {
            res.send({ message: 'email no confirmado', error: 5 })
        }
    } else {
        res.send({ message: 'email o contraseña incorrectos', error: 4 })
    }
}


conductorController.changePasswordConductor = async (req, res) => {

    const token = req.body.token
    const data = decodeToken(token)
    
    if (data?.email) {
        const pas = new Conductor()
        const password = await pas.encryptPassword(req.body.password)
        
        const conductor = await Conductor.findOneAndUpdate({ email: data.email }, {
            password: password
        }, {
            new: true
        })
    }else{
        res.send({message:'algo ha pasado, vuelva a solicitar el cambio de contraseña desde la app'})
    }
    res.send({message:'su contraseña ha sido cambiada'})
}

module.exports = conductorController