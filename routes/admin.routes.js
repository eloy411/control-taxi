const express = require('express');
const router = express.Router();
const {getSpecificDenunciados,getSpecificDenunciante,getAllDenunciados, getAllDenuncias,deleteSpecificDenuncia} = require('../controllers/admin.controller')

const Denunciado = require('../models/denunciado')
const Denuncia = require('../models/denuncia')



router.post('/api/web/admin/specific-denunciante',getSpecificDenunciante)

router.post('/api/web/admin/specific-denunciados',getSpecificDenunciados)
router.post('api/web/admin/delete-specific-denuncia',deleteSpecificDenuncia)

router.get('/api/web/admin/todos-denunciados',getAllDenunciados)
router.get('/api/web/admin/denuncias',getAllDenuncias)


router.get('/delete',async(req,res)=>{
    await Denuncia.deleteMany()
    await Denunciado.deleteMany()
})

module.exports = router;