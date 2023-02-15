const AlgorithmGrafic = {}


AlgorithmGrafic.mergeDefinicionDenuncias = (definiciones) => {

    var listaAux = []
    var i = 0
    var j = 0
    var cont = 0

    for (i = 0; i < definiciones.cliente.length; i++) {
        listaAux.push(definiciones.cliente[i])
    }

    for (i = 0; i < definiciones.conductor.length; i++) {
        cont = 0
        for (j = 0; j < listaAux.length; j++) {
            if (definiciones.conductor[i][0] === listaAux[j][0]) {
                cont++
                j = listaAux.length
            }
        }
        if (cont === 0) {
            listaAux.push(definiciones.conductor[i])
        }
    }
    return listaAux
}

AlgorithmGrafic.data = (denuncias, definiciones, rol, type, mes, id, specificDenuncia) => {
    console.log(specificDenuncia)
    var identificacion = id.toLowerCase()
    var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var lista = []
    var listaAux = []
    var finalList = []
    var i = 0
    var j = 0
    var cont = 0


    /**ESCOGEMOS DE QUIEN QUEREMOS LAS DENUNCIAS SI DE TODOS O CLIENTES/CONDUCTORES*/
    if (rol[1]) {

        for (i = 0; i < denuncias.length; i++) {
            if (denuncias[i].rol === 'cliente') {
                lista.push(denuncias[i])
            }
        }
        console.log('denuncias de clientes')

    } else if (rol[2]) {
        for (i = 0; i < denuncias.length; i++) {
            if (denuncias[i].rol === 'conductor') {
                lista.push(denuncias[i])
            }
        }
        console.log('denuncias de conductores')
    }
    else {
        for (i = 0; i < denuncias.length; i++) {
            lista.push(denuncias[i])
        }

        console.log('todas las denuncias')
    }

    // console.log(lista)

    /**ESCOGER DENUNCIADO SPECÍFICO */

    if (identificacion !== 'todos') {
        console.log('hay una denuncia específica')

        for (i = 0; i < lista.length; i++) {
            if (lista[i].licencia === identificacion || lista[i].matricula === identificacion) {
                listaAux.push(lista[i])
            }

        }

        lista = []
        for (i = 0; i < listaAux.length; i++) {
            lista.push(listaAux[i])
        }
        // console.log('aqui')
        console.log(lista)
    }


    /**QUE CLASE DE DIAGRAMA QUEREMOS */

    if (type[0]) { /**EL ADMIN HA ESCOGIDO TOTAL DENUNCIAS POR MES */
        console.log('total de denuncias')
        for (i = 0; i < month.length; i++) {

            cont = 0

            for (j = 0; j < lista.length; j++) {

                if (month[i] === lista[j].createdAt.toString().substring(5, 7)) {
                    cont++
                }
            }
            finalList.push([month[i], cont])
        }


    }
    else if (type[1]) {/** EL ADMIN QUIERE TODAS LAS DENUNCIAS POR NOMBRE Y POR MES*/

        /**ESCOGE LAS DENUNCIAS SI SON REALIZADAS POR CLIENTE, POR CONDUCTOR O POR TODOS */
        if (rol[1]) {
            console.log('total denuncias nombradas cliente')
            for (i = 0; i < definiciones.cliente.length; i++) {
                cont = 0
                for (j = 0; j < lista.length; j++) {

                    if (lista[j].createdAt.toString().substring(5, 7) === mes.toString() && lista[j].nivel === definiciones.cliente[i][0]) {
                        cont++
                    }
                }
                console.log(cont)
                finalList.push([definiciones.cliente[i], cont])
            }

        }
        else if (rol[2]) {

            console.log('total denuncias nombradas conductor')

            for (i = 0; i < definiciones.conductor.length; i++) {
                cont = 0
                for (j = 0; j < lista.length; j++) {
                    if (lista[j].createdAt.toString().substring(5, 7) === mes.toString() && lista[j].nivel === definiciones.conductor[i][0]) {
                        cont++
                    }
                }
                finalList.push([definiciones.conductor[i], cont])
            }

        }

        else {

            console.log('total denuncias nombradas todas')

            listaAux = AlgorithmGrafic.mergeDefinicionDenuncias(definiciones)

            for (i = 0; i < listaAux.length; i++) {
                cont = 0
                for (j = 0; j < lista.length; j++) {
                    if (lista[j].createdAt.toString().substring(5, 7) === mes.toString() && lista[j].nivel === listaAux[i][0]) {
                        cont++
                    }
                }
                finalList.push([listaAux[i], cont])
            }

        }
    }

    else if (type[2]) { /**EL ADMIN HA ESCOGIDO ESQUEMA CON UNA DENUNCIA ESPECÍFICA */

        console.log('total de denuncias')

        for (i = 0; i < month.length; i++) {

            cont = 0

            for (j = 0; j < lista.length; j++) {

                if (month[i] === lista[j].createdAt.toString().substring(5, 7) && lista[j].infraccion === specificDenuncia) {

                    cont++
                }
            }
            finalList.push([month[i], cont])
        }

    }



    return finalList

}

// }





export default AlgorithmGrafic