const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const ClientSchema = new Schema({
    rol:{type: String, default:'cliente'},
    nombre: { type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required:true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    numDenuncias: {type: Number,  default:0},
    numDenunciasImagen: {type: Number, default:0},
    estado:{type:String, default:'bloqueado'},
    veracidad:{type:Number, default:0},
    denunciasTotalDia:{type:Number, default:0},
    actualizacionDatos:{type:Boolean, default:false}
},{ 
    timestamps: true
}
);

ClientSchema.methods.encryptPassword = async password => {
   const salt =  await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

ClientSchema.methods.matchPassword = async function(password) {
   return await bcrypt.compare(password,this.password)
}



module.exports = model('Client',ClientSchema)