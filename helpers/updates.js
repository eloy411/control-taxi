const updates = {}
const Cliente = require('../models/cliente')
const Conductor = require('../models/conductor')


updates.updateClienteAceptadoPremiadoImagen = async (user) => {

    id = user.id
    veracidad = user.veracidad

    if (veracidad > 0) {
        await Cliente.findByIdAndUpdate(id, {
            $inc: {
                numDenuncias: 1,
                numDenunciasImagen: 1,
                veracidad: -1,
                denunciasTotalDia: 1
            }
        }, {
            new: true
        })
    }
    else {
        await Cliente.findByIdAndUpdate(id, {
            $inc: {
                numDenuncias: 1,
                numDenunciasImagen: 1,
                denunciasTotalDia: 1
            }
        }, {
            new: true
        })
    }
}


updates.updateClienteAceptado = async (user) => {

    id = user.id

    await Cliente.findByIdAndUpdate(id, {
        $inc: {
            numDenuncias: 1,
            denunciasTotalDia: 1
        }
    }, {
        new: true
    })
}

updates.updateClienteDenegado = async (user) => {

    id = user.id

    await Cliente.findByIdAndUpdate(id, {
        $inc: {
            numDenuncias: 1,
            veracidad: 1,
            denunciasTotalDia: 1
        }
    }, {
        new: true
    })
}

updates.updateClienteDenunciasDia = async (user) => {

    id = user.id
    console.log(id)
    const cliente = await Cliente.findByIdAndUpdate(id, {
        denunciasTotalDia: 0
    }, {
        new: true
    })
}


updates.updateClientePassword = async (user) => {
    id = user.id
    console.log(id)
    await Cliente.findByIdAndUpdate(id, {
        password: 0
    }, {
        new: true
    })
}

updates.updateActualizacionDatosCliente = async (user) => {
    id = user.id
    console.log(id)
    await Cliente.findByIdAndUpdate(id, {
        actualizacionDatos: false
    }, {
        new: true
    })
}








module.exports = updates