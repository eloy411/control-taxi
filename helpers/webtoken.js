require('dotenv').config()

const jwt = require('jsonwebtoken')

const helperToken = {}



helperToken.generateAccessToken = (email)=>{
    
     return jwt.sign({email:email},process.env.SECRET,{expiresIn:'120m'})
}




helperToken.validationToken = (req,res,next)=>{

    const queryToken = JSON.parse(req.headers['authorization']);

    if(!queryToken){
        res.send({message:'ha ocurrido un error con la autenticación',error:5})
    }
    else{
        jwt.verify(queryToken.token,process.env.SECRET,(err,user)=>{
            if(err){
                res.send({message:'algo ha ocurrido, le reedirigimos a iniciar sesion',error:6})
            }else{
                
                req.rol = queryToken.rol
                req.user = queryToken.id 
                next()
                
            }
        })
    }
}

helperToken.decodeToken = (token) =>{
    let data = null
    try {
        jwt.verify(token,process.env.SECRET,function(err,decoded){
            if(err){
                console.log(err) 
            }else{
                data = decoded
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = helperToken;