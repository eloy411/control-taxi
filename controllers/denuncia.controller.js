const cloudinary = require('cloudinary')
const Denuncia = require('../models/denuncia')
const Cliente = require('../models/cliente')
const Conductor = require('../models/conductor')

const { definicionInfraccion } = require('../helpers/infraccion')
const {actualizacionDenunciado} = require('../controllers/denunciado.controller')

cloudinary.v2.config({

    cloud_name: 'eloy411',
    api_key: '655444365249817',
    api_secret: 'fRaR-rNpRGZjkCZed9Yl81YfcKk',
    secure: true

})

const denunciaController = {}



denunciaController.registerDenuncia = async (req, res, next) => {
    
    
    const { licencia, matricula, nivel, infraccion = definicionInfraccion(nivel), explicacion } = req.body;
    const denunciante = req.user
    const rol = req.rol



    if (req.files) {//SI EXISTE EL ARCHIVO

        try {
            var result = await cloudinary.v2.uploader.upload(req.files.file.tempFilePath)
        } catch {
            try {
                var result = await cloudinary.v2.uploader.upload(req.files.file.tempFilePath, { resource_type: "video" })
            } catch (error) {
                res.send({ error: 1, message: error })
            }
        }


        var a = result.public_id
        var b = result.secure_url
        imagen = []
        imagen.push(a, b)
        const denuncia = new Denuncia({ licencia, matricula, nivel, infraccion, explicacion, imagen, denunciante,rol })
        await denuncia.save()
        const response = await actualizacionDenunciado(req.body,req.files)
        if(response?.error){
            res.send({error:response.error,message:response.message})
        }else{
            res.send({ message: 'denuncia enviada gracias por ayudar a mejorar el sector!CON', error: 0 })
        }


        
    } else {//SI NO EXISTE EL ARCHIVO 

        imagen = [];
        const denuncia = new Denuncia({ licencia, matricula, nivel, infraccion, explicacion, imagen, denunciante,rol });
        await denuncia.save()
        const response = await actualizacionDenunciado(req.body,req.file)
        if(response?.error){
            res.send({error:response.error,message:response.message})
        }else{
            res.send({ message: 'denuncia enviada gracias por ayudar a mejorar el sector!SIN', error: 0 })
        }
        
    }



}

module.exports = denunciaController