const Denunciado = require('../models/denunciado')
const Corrector = require('../models/correctorDatosDenunciado')
const Denuncia = require('../models/denuncia')


const denunciadoController = {}



denunciadoController.actualizacionDenunciado = async (datos, file) => {

    if (file === undefined) {
        var x = 1
        var z = 0
    } else {
        var x = 0
        var z = 1
    }
    console.log(file)
    if (datos.licencia !== '' && datos.matricula === '') {

        const denunciado = await Denunciado.find({ licencia: datos.licencia })/**BUSCAMOS CON ESTAS CONDICIONES */

        if (!denunciado[0]?.licencia) {/**SI NO HAY MATCH CREAMOS*/
            
            var licencia = datos.licencia
            var matricula = ''
            var totalDenSinImg = x
            var totalDenConImg = z
            var infoConfirmada = false
            const newDenunciado = new Denunciado({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
            await newDenunciado.save()

        } else {/**SI HAY MATCH UPDATEAMOS */
            console.log(denunciado)
            await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                $inc: {
                    totalDenSinImg: x,
                    totalDenConImg: z
                }
            }, {
                new: true
            })

            if(denunciado[0].matricula !== '' && denunciado[0].infoConfirmada === true){
                console.log('hay coincidencia y tiene matricula')
                await Denuncia.updateMany({licencia:datos.licencia},
                {matricula:denunciado[0].matricula})
            }
            
        }


    } else if (datos.licencia === '' && datos.matricula !== '') {

        const denunciado = await Denunciado.find({ matricula: datos.matricula })/**BUSCAMOS CON ESTAS CONDICIONES */

        if (!denunciado[0]?.matricula) {/**SI NO HAY MATCH CREAMOS */
            var licencia = ''
            var matricula = datos.matricula
            var totalDenSinImg = x
            var totalDenConImg = z
            var infoConfirmada = false
            const newDenunciado = new Denunciado({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
            await newDenunciado.save()

        } else {/**SI HAY MATCH UPDATEAMOS */
            await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                $inc: {
                    totalDenSinImg: x,
                    totalDenConImg: z
                }
            }, {
                new: true
            })

            if(denunciado[0].licencia !== '' && denunciado[0].infoConfirmada === true){
                
                await Denuncia.updateMany({matricula:datos.matricula},
                {licencia:denunciado[0].licencia})
            }
        }
    }
    /**----------------------------------------------------------------------------------------------------------------------------------------- */
    else {

        /**SI LA ENTRADA TIENE LOS DOS VALORES */

        /**BUSCAMOS SI HAY coincidencia CON LOS DOS PARÁMETROS */
        const denunciado = await Denunciado.find({ licencia: datos.licencia, matricula: datos.matricula })

        if (denunciado[0]?.licencia) {

            /**ENCONTRADO Y CONFIRMADO */
            if (denunciado[0].infoConfirmada) {
                await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                    $inc: {
                        totalDenSinImg: x,
                        totalDenConImg: z
                    }
                }, {
                    new: true
                })
            }

            /**ENCONTRADO Y NO CONFIRMADO */
            else {
                var licTotalCantidadSinImg = 0
                var licTotalCantidadConImg = 0
                var matTotalCantidadSinImg = 0
                var matTotalCantidadConImg = 0

                const correccionLic = await Corrector.find({ licencia: datos.licencia })
                 for(var i=0;i<correccionLic.length;i++) {
                    licTotalCantidadSinImg += correccionLic[i].totalDenSinImg
                    licTotalCantidadConImg += correccionLic[i].totalDenConImg
                    await Corrector.findByIdAndDelete(correccionLic[i].id)
                }
                const correccionMat = await Corrector.find({ matricula: datos.matricula })
                for(var i = 0;correccionMat.length;i++) {
                    matTotalCantidadSinImg = correccionMat[i].totalDenSinImg
                    matTotalCantidadConImg = correccionMat[i].totalDenConImg
                    await Corrector.findByIdAndDelete(correccionMat[i].id)
                }

                await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                    infoConfirmada: true,
                    $inc: {
                        totalDenSinImg: x + licTotalCantidadSinImg + matTotalCantidadSinImg,
                        totalDenConImg: z + licTotalCantidadConImg + matTotalCantidadConImg
                    }
                }, {
                    new: true
                })
                await Denuncia.updateMany({licencia:datos.licencia,matricula:''},
                {matricula:datos.matricula})
                await Denuncia.updateMany({matricula:datos.licencia,licencia:''},
                {licencia:datos.licencia})
                console.log('aqui')
            }
        }

        /**NO HA ENCONTRADO LOS DOS PARAMETROS A LA VEZ AHORA HAY QUE HACER UNA SERIE DE COMPROVACIONES */
        else {

            /**VERIFICAMOS SI ESTA EN CORRECTOR  */
            const correccion = await Corrector.find({ licencia: datos.licencia, matricula: datos.matricula })

            if (correccion[0]?.licencia) {
                var licTotalCantidadSinImg = 0
                var licTotalCantidadConImg = 0
                var matTotalCantidadSinImg = 0
                var matTotalCantidadConImg = 0
                const lic = await Denunciado.find({ licencia: datos.licencia })
                
                if (lic[0]?.licencia) {

                    licTotalCantidadSinImg = lic[0].totalDenSinImg
                    licTotalCantidadConImg = lic[0].totalDenConImg
                    await Denunciado.findByIdAndDelete(lic[0].id)
                }
                const mat = await Denunciado.find({ matricula: datos.matricula })
                if (mat[0]?.matricula) {
                    matTotalCantidadSinImg = mat[0].totalDenSinImg
                    matTotalCantidadConImg = mat[0].totalDenConImg
                    await Denunciado.findByIdAndDelete(mat[0].id)
                }
                await Corrector.findByIdAndDelete(correccion[0].id)
                const correctorLic = await Corrector.find({licencia: datos.licencia})
                const correctorMat = await Corrector.find({matricula: datos.matricula})

                for(var i = 0;i < correctorLic.length;i++){
                    licTotalCantidadSinImg+=correctorLic[i].totalDenSinImg
                    licTotalCantidadConImg+=correctorLic[i].totalDenConImg
                    await Corrector.findByIdAndDelete(correctorLic[i].id)
                }
                for(var i = 0;i < correctorMat.length;i++){
                    licTotalCantidadSinImg+=correctorMat[i].totalDenSinImg
                    licTotalCantidadConImg+=correctorMat[i].totalDenConImg
                    await Corrector.findByIdAndDelete(correctorMat[i].id)
                }

                var licencia = datos.licencia
                var matricula = datos.matricula
                var totalDenSinImg = x + licTotalCantidadSinImg + matTotalCantidadSinImg + correccion[0].totalDenSinImg
                var totalDenConImg = z + licTotalCantidadConImg + matTotalCantidadConImg + correccion[0].totalDenConImg
                var infoConfirmada = true
                const newDenunciado = new Denunciado({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
                await newDenunciado.save()

                await Denuncia.updateMany({licencia:datos.licencia},
                {matricula:datos.matricula},{
                    new:true
                })
                await Denuncia.updateMany({matricula:datos.matricula},
                {licencia:datos.licencia},{
                    new:true
                })


            }

            /**  EN EL CORRECTOR NO ESTA */
            else {

                /**SI NO EXISTE MATCH MIRAMOS SI HAY SOLO LICENCIA O SOLO MATRÍCULA EN DENUNCIADOS
                 * 
                 * EMPEZAMOS BUSCANDO LICENCIA
                */

                const denunciado = await Denunciado.find({ licencia: datos.licencia })


                if (denunciado[0]?.licencia) {

                    /**EXISTE LICENCIA */

                    if (denunciado[0].matricula !== '' && denunciado[0].infoConfirmada) {/**COMPROBAMOS SI TIENE MATRICULA DIFERENTE y CONFIRMADO */

                        return { error: 1, message: 'creemos que la matricula o licencia son erroneas' }

                        /** Si esta confirmado out*/

                    } else if (denunciado[0].matricula !== '' && !denunciado[0].infoConfirmada) {/**EXISTE MATRICULA PERO NO ESTA CONFIRMADO */

                        var licencia = datos.licencia
                        var matricula = datos.matricula
                        var totalDenSinImg = x
                        var totalDenConImg = z
                        var infoConfirmada = false
                        const newCorrector = new Corrector({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
                        await newCorrector.save()

                        /**como ha encontrado un denunciado con misma licencia y matricula diferente lo enviamos a corrector 
                         * si alguien hace otra denuncia con los dos parámetros primero buscara en denunciados y si coincide este
                         * lo confirmara sumara denuncia y buscara en corrector y borrara. 
                         * Si no encuentra coincidencia buscara en corrector y si cohincide confirma veracidad y actualizará y borrará los que hay 
                         * en denunciados
                         */


                    } else {/**SI LA MATRICULA ES NULA UPDATEAMOS MATRICULA Y SUMAMOS UNA DENUNCIA */


                        /**HAY QUE BUSCAR SI HAY DENUNCIADO POR MATRICULA SI ES LA MISMA */
                        const mat = await Denunciado.find({ matricula: datos.matricula })

                        var matTotalCantidadSinImg = 0
                        var matTotalCantidadConImg = 0

                        if (mat[0]?.totalDenSinImg) {
                            matTotalCantidadSinImg = mat[0].totalDenSinImg
                        }
                        if (mat[0]?.totalDenConImg) {
                            matTotalCantidadConImg = mat[0].totalDenConImg
                        }

                        if (mat[0]?.matricula) {

                            if (mat[0].licencia !== '' && mat[0].infoConfirmada) {

                                return { error: 1, message: 'creemos que la matricula o licencia son erroneas' }

                            } else if (mat[0].licencia !== '' && !mat[0].infoConfirmada) {

                                var licencia = datos.licencia
                                var matricula = datos.matricula
                                var totalDenSinImg = x
                                var totalDenConImg = z
                                var infoConfirmada = false
                                const newCorrector = new Corrector({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
                                await newCorrector.save()
                            } else {
                                await Denunciado.findByIdAndUpdate(denunciado[0].id, {

                                    matricula: datos.matricula,
                                    $inc: {
                                        totalDenSinImg: x + matTotalCantidadSinImg,
                                        totalDenConImg: z + matTotalCantidadConImg
                                    }
                                }, {
                                    new: true
                                })
                                await Denunciado.findByIdAndDelete(mat[0].id)

                            }

                        } else {

                            await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                                matricula: datos.matricula,
                                $inc: {
                                    totalDenSinImg: x,
                                    totalDenConImg: z
                                }
                            }, {
                                new: true
                            })
                        }
                    }
                }
                /**NO SE HA ENCONTRADO COINCIDENCIA CON LICENCIA VAMOS CON MATRÍCULA  */
                else {

                    /**------------------------------------------------------------------------
                     * debemos hacer repetir este proceso porque sino no pasamos por matrícula,
                     * se comprueba licencia y si hay coincidencia, puede que haya tambien matrícula,
                     * si no lo hay, cabe la posibilidad de haber cohincidencia con matrícula 
                    */
                    const denunciado = await Denunciado.find({ matricula: datos.matricula })


                    if (denunciado[0]?.matricula) {

                        /**EXISTE MATRÍCULA */

                        if (denunciado[0].licencia !== '' && denunciado[0].infoConfirmada) {/**COMPROBAMOS SI TIENE MATRICULA DIFERENTE y CONFIRMADO */

                            return { error: 1, message: 'creemos que la matricula o licencia son erroneas' }

                            /** Si esta confirmado out*/

                        } else if (denunciado[0].licencia !== '' && !denunciado[0].infoConfirmada) {/**EXISTE LICENCIA PERO NO ESTA CONFIRMADO */

                            var licencia = datos.licencia
                            var matricula = datos.matricula
                            var totalDenSinImg = x
                            var totalDenConImg = z
                            var infoConfirmada = false
                            const newCorrector = new Corrector({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
                            await newCorrector.save()

                            /**como ha encontrado un denunciado con misma licencia y matricula diferente lo enviamos a corrector 
                             * si alguien hace otra denuncia con los dos parámetros primero buscara en denunciados y si coincide este
                             * lo confirmara sumara denuncia y buscara en corrector y borrara. 
                             * Si no encuentra coincidencia buscara en corrector y si cohincide confirma veracidad y actualizará y borrará los que hay 
                             * en denunciados
                             */


                        } else {
                            /**SI LA MATRICULA ES NULA UPDATEAMOS MATRICULA Y SUMAMOS UNA DENUNCIA */

                            /**A DIFERENCIA DE ANTES YA SABEMOS QUE NO HAY COINCIDENCIA CON LICENCIA
                             * 
                             * UPDATEAMOS Y LISTO
                             */


                            await Denunciado.findByIdAndUpdate(denunciado[0].id, {
                                licencia: datos.licencia,
                                $inc: {
                                    totalDenSinImg: x,
                                    totalDenConImg: z
                                }
                            }, {
                                new: true
                            })

                        }
                    } else {
                        /**AQUI */
                        console.log('no hay coincidencia de nada')
                        var licencia = datos.licencia
                        var matricula = datos.matricula
                        var totalDenSinImg = x
                        var totalDenConImg = z
                        var infoConfirmada = false
                        const newDenunciado = new Denunciado({ licencia, matricula, totalDenSinImg, totalDenConImg, infoConfirmada })
                        await newDenunciado.save()
                    }
                }
            }

        }


    }
}

module.exports = denunciadoController