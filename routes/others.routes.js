const express = require('express')
const Denuncia = require('../models/denuncia')
const router = express.Router()
const {confirmEmailCliente,changePasswordCliente} = require('../controllers/cliente.controller')
const {confirmEmailConductor} = require('../controllers/conductor.controller')
const {sendLinkNewPassword} = require('../helpers/newpassword')
const listaDenuncias = require('../data/denuncias.json')
const info = require('../data/info.json')
const {validationTwinPassword} = require('../helpers/validation-params')


router.get('/api/cliente/confirm/:token',confirmEmailCliente)
router.get('/api/conductor/confirm/:token',confirmEmailConductor)

router.get('/api/listadenuncias',(req,res)=>{
    res.send(JSON.stringify(listaDenuncias))
})

router.get('/api/info',(req,res)=>{
    res.send(JSON.stringify(info))
})

router.post('/api/newpassword',sendLinkNewPassword)



router.get('/api/cliente/newpassword/:token',(req,res)=>{res.render('new-password',{token:req.params.token})})
router.post('/api/cliente/newpassword/:token',validationTwinPassword,changePasswordCliente)


// router.get('/api/delete-all',async (req,res)=>{
//     await Denuncia.deleteMany()
// })
module.exports = router 