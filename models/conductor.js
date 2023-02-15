const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const ConductorSchema = new Schema({
    rol:{type:String,default:'conductor'},
    nombre: { type: String, required: true},
    apellido: {type: String, required: true},
    licencia:{type: String, required: true},
    telefono: {type: String, required:true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    numDenuncias: {type: Number, default:0},
    numDenunciasImagen: {type: Number, default:0},
    estado:{type:String, default:'bloqueado'}
},{ 
    timestamps: true
}
);

ConductorSchema.methods.encryptPassword = async password => {
   const salt =  await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

ConductorSchema.methods.matchPassword = async function(password) {
   return await bcrypt.compare(password,this.password)
}



module.exports = model('Conductor',ConductorSchema)