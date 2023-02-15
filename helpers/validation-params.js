const validation = {}

validation.validationParams = (req,res,next) =>{
    console.log(req.body)
    if(req.body.licencia != '' || req.body.matricula != ''){
        next() 
        
    }else{
        res.send({message:'debe de rellenar al menos licencia o matrícula',error:1})
    }
}

validation.validationTwinPassword = (req,res,next) =>{
    if(req.body.password === req.body.twin){
        next()
    }else{
        res.send({message:'las contraseñas deben ser iguales', error:7})
    }
}
module.exports = validation