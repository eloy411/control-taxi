const express = require('express')
const router = express.Router()

const { validationToken } = require('../helpers/webtoken');
const { controlVeracidadlConductor } = require('../controllers/veracidad.controller');
const { singupConductor, singinConductor } = require('../controllers/conductor.controller')
const { registerDenuncia } = require('../controllers/denuncia.controller')
const { validationParams, validationTwinPassword } = require('../helpers/validation-params')



router.post('/api/conductor/singup',
    validationTwinPassword,
    singupConductor)


router.post('/api/conductor/singin', singinConductor)



router.post('/api/conductor/denuncia',
    validationToken,
    validationParams,
    // controlVeracidadlConductor,
    registerDenuncia) 
// )

module.exports = router;