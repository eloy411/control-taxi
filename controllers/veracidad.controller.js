const Cliente = require('../models/cliente')
const Denuncia = require('../models/denuncia')
const { definicionInfraccion } = require('../helpers/infraccion');
const { updateClienteAceptadoPremiadoImagen, updateClienteAceptado, updateClienteDenegado, updateClienteDenunciasDia, updateActualizacionDatosCliente } = require('../helpers/updates')

const patronVeracidadDenuncia = {}


patronVeracidadDenuncia.controlVeracidadlCliente = async (req, res, next) => {

    var denunciasDeHoy = {};

    var i = 0

    var infoCliente = await Cliente.findById(req.user)
 
    var fechaDeHoy = new Date().toString().substring(0, 10)

    const fechaUltimaActualizacionCliente = infoCliente.updatedAt.toString().substring(0, 10)

    const infoDenunciasCliente = await Denuncia.find({ denunciante: req.user })

    console.log(infoDenunciasCliente)
    infoDenunciasCliente.forEach(function (element) {

        if (fechaDeHoy == element.updatedAt.toString().substring(0, 10)) {
            denunciasDeHoy[i] = element
            i++
        }
    })
    console.log(fechaDeHoy)
    console.log(fechaUltimaActualizacionCliente)

    if (fechaDeHoy != fechaUltimaActualizacionCliente) {//SE REINICIAN LAS DENUNCIAS A 0
        await updateClienteDenunciasDia(infoCliente)
        infoCliente.denunciasTotalDia = 0
    }

    console.log(infoCliente.denunciasTotalDia)
    if (infoCliente.veracidad < 3 && infoCliente.estado != 'bloqueado' && infoCliente.denunciasTotalDia < 3) {



        if (i == 0) {
            if (req.files?.file) {

                await updateClienteAceptadoPremiadoImagen(infoCliente)
                console.log('haces la denuncia -1 en veracidad si veracidad es > 0')
                next()
                // res.send({ error: 1, message: 'aqui 2' })
            }
            else {
                await updateClienteAceptado(infoCliente)
                console.log('haces la denuncia veracidad se queda igual')
                next()
                // res.send({error:1,message:'aqui 1'})  
            }
        }
        else {

            var i = i - 1 // RESTAMOS PARA CONVERTIRLO EN INDICE (ANTES LO USABA DE CONTADOR DE TOTAL DE DENUNCIAS)

            console.log('hay varias denuncias en el mismo dia')



            var igualdadLicencia = false//DECLARO UNA CONDICION (LEER EXPLICACION DE VERACIDAD)


            if (denunciasDeHoy[i].licencia === req.body.licencia || denunciasDeHoy[i].matricula === req.body.matricula) { igualdadLicencia = true }

            if (igualdadLicencia
                && (denunciasDeHoy[i].infraccion === definicionInfraccion(req.body.nivel))
                && (req.files == null)
                && (denunciasDeHoy[i].imagen.length == 0)) {
                updateClienteDenegado(infoCliente)
                console.log('anular y +1 en veracidad (misma licencia o matricula mismo motivo sin imagen en las dos denuncias)')
                res.send({ error: 100, message: 'denegado' })

            } else if (igualdadLicencia
                && (denunciasDeHoy[i].infraccion === definicionInfraccion(req.body.nivel))
                && ((req.files?.file)
                    && (denunciasDeHoy[i].imagen.length == 2))) {

                updateClienteAceptado(infoCliente)
                console.log('aceptar denuncia y  veracidad igual(misma licencia o matricula mismo motivo con imagen en dos denuncia)')
                next()

            } else if (igualdadLicencia
                && (denunciasDeHoy[i].infraccion === definicionInfraccion(req.body.nivel))
                && ((req.files?.file)
                    || (denunciasDeHoy[i].imagen.length == 2))) {

                if (req.files?.file) {
                    updateClienteAceptado(infoCliente)
                    console.log('imagen en la nueva igual se le ha olvidado adjuntarla antes')
                    next()
                } else {
                    console.log('la imagen estaba en la antigua DENEGAR ESTA DENUNCIA')
                    res.send({ message: 'ha repetido la denuncia', error: 105 })
                }
                console.log('aceptar denuncia si imagen en la nueva  y dejar veracidad igual(misma licencia o matricula mismo motivo con imagen en una denuncia)')

            } else if (igualdadLicencia
                && denunciasDeHoy[i].infraccion !== definicionInfraccion(req.body.nivel)) {

                updateClienteAceptado(infoCliente)

                console.log('aceptar y dejar vericidad igual(misma licencia diferente motivo)')
                next()

            } else if (!igualdadLicencia
                && (new Date() - denunciasDeHoy[i].updatedAt) > 1800000
                && ((req.files?.file)
                    && (denunciasDeHoy[i].imagen.length == 2))) {

                updateClienteAceptadoPremiadoImagen(infoCliente)

                console.log('aceptar y  -1 veracidad si veracidad > 0(diferente licencia + 30min + imagen en las 2)')
                next()

            } else if (!igualdadLicencia
                && (new Date() - denunciasDeHoy[i].updatedAt) > 1800000
                && ((req.files?.file)
                    || (denunciasDeHoy[i].imagen.length == 2))) {

                if (req.files?.file) { 
                    updateClienteAceptadoPremiadoImagen(infoCliente) 
                    console.log('aceptar y  dejar vericidad igual(diferente licencia + 30min imagen en una de las 2) ')
                    next()
                } else {
                    updateClienteAceptado(infoCliente)
                    console.log('aceptar y  dejar vericidad igual(diferente licencia + 30min imagen en una de las 2) ')
                    next()
                }


            } else if (!igualdadLicencia
                && (new Date() - denunciasDeHoy[i].updatedAt) > 1800000
                && (req.files == null
                    && (denunciasDeHoy[i].imagen.length == 0))) {

                updateClienteAceptado(infoCliente)

                console.log('aceptar y dejar veracidad igual(diferente licencia + 30 min sin imagen en las 2) ')
                next()

            } else if (!igualdadLicencia
                && ((new Date() - denunciasDeHoy[i].updatedAt)) < 1800000) {

                updateClienteDenegado(infoCliente)

                console.log('denegar y +1 veracidad (diferente licencia - de 30 min')
                res.send({ error: 100, message: 'denegada' })
            }

        }
    }
    else {
        if (infoCliente.veracidad === 3) {

            res.send({ message: 'ha sido usted bloqueado', error: 102 })
        }
        else if (infoCliente.estado == 'bloqueado') {

            res.send({ message: 'No se ha confirmado su email', error: 101 })

        }
        else if (infoCliente.denunciasTotalDia >= 3) {

            res.send({ message: 'Ha superado el total de denuncias en un dia', error: 103 })
        }
    }
}


module.exports = patronVeracidadDenuncia