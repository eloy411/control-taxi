const {Schema, model} = require('mongoose')

const CorrectorSchema = new Schema({

    licencia:{type:String},
    matricula:{type:String},
    totalDenSinImg:{type:Number},
    totalDenConImg:{type:Number},
    infoConfirmada:{type:Boolean}

},{ 
    timestamps: true
})

module.exports = model('Corrector',CorrectorSchema)