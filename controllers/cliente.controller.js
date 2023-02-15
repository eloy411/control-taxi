
/**CONTROLADOR PARA CUENTA DE USUARIO: CLIENTE  */

const Cliente = require('../models/cliente')
const { getTemplate, sendEmail } = require('../config/mail.config')
const { generateAccessToken, decodeToken } = require('../helpers/webtoken');


const clienteController = {}


 /* CHANGE TO SIGN UP*/
clienteController.singupCliente = async (req, res) => {

    const { rol, nombre, apellido, telefono, email, password } = req.body;
    
    const emailCliente = await Cliente.findOne({ email: email });

    if (!emailCliente) {

        const accessToken = generateAccessToken(email);

        const template = getTemplate(nombre, rol, accessToken);

        /**ENVIAMOS EMAIL PARA LA CONFIRMACIÓN DE ESTE */
        const response = await sendEmail(email, 'El fuckin Eloy nene', template);

        if (!response) {/**SI NO HAY ERROR ENTONCES CREAS EL CLIENTE. */

            newCliente = new Cliente({ nombre, apellido, telefono, email, password })

            newCliente.password = await newCliente.encryptPassword(password)

            await newCliente.save();

            res.send({ message: 'registrado, revisa tu email y confirma!', error: 0 })
            
        }else{
            res.send({ message: response, error: 8 })
        }

    } else {
        res.send({ message: 'este usuario ya existe', error: 2 })
    }
}


clienteController.confirmEmailCliente = async (req, res) => {

    const { token } = req.params

    const data = decodeToken(token)
    
    if (data?.email) {
        const cliente = await Cliente.findOneAndUpdate({ email: data.email }, {
            estado: 'autorizado'
        }, {
            new: true
        })
        console.log(cliente)
    } else {
        res.render('fail')
    }
    res.render('confirm')
}


clienteController.singinCliente = async (req, res) => {

    email = req.body.email
    password = req.body.password
    rol = req.body.rol

    const cliente = await Cliente.findOne({ email })

    if (cliente) {

        if (cliente.estado == 'autorizado') {

            const match = await cliente.matchPassword(password)

            if (match) {
                const accessToken = generateAccessToken(email);

                res.header('authorization', accessToken)

                res.send({ error: 0, token: accessToken, id: cliente.id, rol: rol })

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


clienteController.changePasswordCliente = async (req, res) => {

    const token = req.body.token
    const data = decodeToken(token)
    
    if (data?.email) {

        const pas = new Cliente()
        const password = await pas.encryptPassword(req.body.password)
        
        const cliente = await Cliente.findOneAndUpdate({ email: data.email }, {
            password: password
        }, {
            new: true
        })

    }else{

        res.send({message:'algo ha pasado, vuelva a solicitar el cambio de contraseña desde la app'})
    }

    res.render('confirm')
}

module.exports = clienteController


