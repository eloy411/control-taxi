const Algorithm = {}


Algorithm.licenciasDenunciadas = (lista) => {

    var i = 0
    const listaSingleLicence = []
    const listaNumDenunciasPorLicencia = []

    while (i < lista.length) {

        var j = 0
        var cont = 0

        while (j < listaSingleLicence.length) {

            if (lista[i] === listaSingleLicence[j]) {
                j = listaSingleLicence.lenght
            } else {
                cont++
            }

            j++
        }
        if (cont === listaSingleLicence.length && lista[i] !== '') {
            listaSingleLicence.push(lista[i])
        }
        i++
    }
    i = 0


    while (i < listaSingleLicence.length) {
        j = 0
        var contNumDenuncias = 0
        while (j < lista.length) {
            if (listaSingleLicence[i] === lista[j]) {
                contNumDenuncias++
            }
            j++
        }
        listaNumDenunciasPorLicencia.push([listaSingleLicence[i], contNumDenuncias++])

        i++
    }

    return listaNumDenunciasPorLicencia


}



Algorithm.ordenar = (listaNumDenunciasPorLicencia) => {/**BUBBLE PARA MATRIZ */

    var ordenado = false

    while (ordenado === false) {
        ordenado = true
        var i = 0
        var aux = ''
        while (i < (listaNumDenunciasPorLicencia.length - 1)) {

            if (listaNumDenunciasPorLicencia[i][1] < listaNumDenunciasPorLicencia[i + 1][1]) {
                aux = listaNumDenunciasPorLicencia[i + 1]
                listaNumDenunciasPorLicencia[i + 1] = listaNumDenunciasPorLicencia[i]
                listaNumDenunciasPorLicencia[i] = aux
                ordenado = false
            }
            i++
        }
    }
    return listaNumDenunciasPorLicencia
}


Algorithm.top = (listaNumDenunciasPorLicencia, numTop) => {

    var i = 0
    var blackL = []
    if (numTop < listaNumDenunciasPorLicencia.length) {
        i = 0
        while (i < numTop) {
            blackL.push([i + 1, listaNumDenunciasPorLicencia[i][0], listaNumDenunciasPorLicencia[i][1]])
            i++
        }
    } else {
        i = 0
        while (i < listaNumDenunciasPorLicencia.length) {
            blackL.push([i + 1, listaNumDenunciasPorLicencia[i][0], listaNumDenunciasPorLicencia[i][1]])
            i++
        }
    }
    return blackL
}


Algorithm.specificDenunciado = (denuncias, denunciado, ordenFecha, ordenGravedad, filtro) => {

    var lista = []

    /**FILTRO DE QUIEN QUEREMOS BUSCAR UNO/TODOS */
    if (denunciado !== 'todos') {
        for (var i = 0; i < denuncias.length; i++) {
            if (denuncias[i].licencia === denunciado || denuncias[i].matricula === denunciado) {
                lista.push(denuncias[i])
            }
        }
    }else{
        for ( i = 0; i < denuncias.length; i++) {
            
                lista.push(denuncias[i])
            
        }
    }


    /** FILTRO POR FECHA*/
    if (ordenFecha) {
        
        lista = lista.reverse()
    }

    /**FILTRO POR GRAVEDAD */

    if (!ordenGravedad[0]) {

        var lista3 = []
        var lista2 = []
        var lista1 = []
        var lista0 = []

        for (i = 0; i < lista.length; i++) {

            if (parseFloat(lista[i].nivel) >= 3.0 && parseFloat(lista[i].nivel) < 4.0) {
                lista3.push(lista[i])
            }
            else if (parseFloat(lista[i].nivel) >= 2.0 && parseFloat(lista[i].nivel) < 3.0) {
                lista2.push(lista[i])
            }
            else if (parseFloat(lista[i].nivel) >= 1.0 && parseFloat(lista[i].nivel) < 2.0) {
                lista1.push(lista[i])
            }
            else if (parseFloat(lista[i].nivel) >= 0.0 && parseFloat(lista[i].nivel) < 1.0) {
                lista0.push(lista[i])
            }
        }

        if (ordenGravedad[1]) {
            lista = []
            lista = lista.concat(lista3,lista2,lista1,lista0)
        }
        else if (ordenGravedad[2]) {
            lista = []
            lista = lista.concat(lista0,lista1,lista2,lista3)
        }
    }

    /**FILTRO POR IMAGEN */

    if (!filtro[0]) {
        var listaCon = []
        var listaSin = []

        for (i = 0; i < lista.length; i++) {
            if (lista[i].imagen.length < 2) {
                listaSin.push(lista[i])
            }
            else if (lista[i].imagen.length === 2) {
                listaCon.push(lista[i])
            }
        }

        if (filtro[1]) {
            lista = listaCon
        }
        else if (filtro[2]) {
            lista = listaSin
        }
    }

    return lista

}


export default Algorithm


