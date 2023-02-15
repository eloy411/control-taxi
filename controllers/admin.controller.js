/**CONTROLADOR PARA EL ADMINISTRADOR DE LA WEB DE CONTROL */

const Cliente = require('../models/cliente')
const Conductor = require('../models/conductor')
const Denuncias = require('../models/denuncia')
const Denunciado = require('../models/denunciado')

const adminController = {}


/**EL ADMIN SOLICITA INFORMACIÓN DE UN DENUNCIADO EN CONCRETO (DEVUELVE UN ARRAY CON OBJETO) */

adminController.getSpecificDenunciados = async (req,res)=>{
   
    const response = await Denunciado.findOne({licencia:req.body.identificador})
    if(response){
    res.send(response)
}else{
    const response = await Denunciado.findOne({matricula:req.body.identificador})
    if(response){
        res.send(response)
    }else{
        res.send({message:'none'})
    }

}
    
}


/**EL ADMIN SOLICITA INFORMACIÓN DE UN DENUNCIANTE EN CONCRETO (DEVUELVE UN ARRAY CON OBJETO) */

adminController.getSpecificDenunciante = async (req,res)=>{

    const response = await Cliente.findById(req.body.identificador)
    if(response){
        res.send(response)
    }else{
        const response = await Conductor.findById(req.body.identificador)
        if(response){
            res.send(response)
        }else{
            res.send({message:'none'})
        }
    }
}

/**EL ADMIN SOLICITA INFORMACIÓN DE TODOS LOS DENUNCIADOS EN CONCRETO (DEVUELVE UN ARRAY CON OBJETOS) */
adminController.getAllDenunciados = async (req,res)=>{
    const response = await Denunciado.find()
    res.send(response)
}


/**EL ADMIN SOLICITA INFORMACIÓN DE TODAS LOS DENUNCIAS EN CONCRETO (DEVUELVE UN ARRAY CON OBJETOS) */
adminController.getAllDenuncias = async (req,res)=>{
    const denuncias = await Denuncias.find()
    res.send({denuncias})
}


/**SIN FUNCIONAMIENTO */
adminController.deleteSpecificDenuncia = async (req,res)=>{
    await Denuncias.findByIdAndDelete(req.body.identificador)

    res.send({error:0,message:'denuncia eliminada'})
}

module.exports = adminController