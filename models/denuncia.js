const {Schema, model} = require('mongoose')


const DenunciaSchema = new Schema({
    
    licencia:{type: String, default:''},
    matricula:{type:String, default:''},
    nivel:{type: String, default:'low'},
    infraccion:{type: String, default:'otros'},
    explicacion:{type: String, default:''},
    imagen:{type:Array},
    denunciante:{type:String},
    rol:{type:String},
    veracidad:{type:String}
},{ 
    timestamps: true
}
);

module.exports = model('Denuncia',DenunciaSchema)