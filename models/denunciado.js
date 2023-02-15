const {Schema, model} = require('mongoose')

const DenunciadoSchema = new Schema({

    licencia:{type:String},
    matricula:{type:String},
    totalDenSinImg:{type:Number},
    totalDenConImg:{type:Number},
    infoConfirmada:{type:Boolean}

},{ 
    timestamps: true
})

module.exports = model('Denunciado',DenunciadoSchema)