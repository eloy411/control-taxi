const express = require('express')
const router = express.Router()

const { validationToken} = require('../helpers/webtoken');
const { controlVeracidadlCliente} = require('../controllers/veracidad.controller');
const { singupCliente,singinCliente } = require('../controllers/cliente.controller')
const { registerDenuncia} = require('../controllers/denuncia.controller')
const {validationParams,validationTwinPassword} = require('../helpers/validation-params')

//**CLIENTE */
router.post('/api/cliente/singup',
            validationTwinPassword ,
            singupCliente
            )


router.post('/api/cliente/singin',
            singinCliente
            )

router.post('/api/cliente/denuncia',
            validationToken,
            validationParams,
            controlVeracidadlCliente,
            registerDenuncia
            )

router.get('/api/prueba',(req,res)=>{res.send({message:'hola'})})




module.exports = router;