import { useEffect, useState } from 'react'
import Algorithm from '../helpers/Algorithm'
import AlgorithmGrafic from '../helpers/Algorithm.grafic'
import Grafics from './sub-components/grafics'

function Analisis() {

    console.log('estoy en Analisis')
    const actualDate = new Date().toISOString().substring(5, 7)

    const [choose, setChoose] = useState('licencias')
    const [id, setId] = useState('todos')
    const [search, setSearch] = useState('')
    const [response, setResponse] = useState('')
    const [definicionDenuncias, setDefinicionDenuncias] = useState('')
    const [specificDenuncia, setSpecificDenuncia] = useState('')
    const [merge, setMerge] = useState('')
    const [checkType, setCheckType] = useState([true, false, false])
    const [checkRol, setCheckRol] = useState([true, false, false])
    const [info, setInfo] = useState('not Data')
    const [month, setMonth] = useState(actualDate)


    const cargarDenuncias = async () => {

        await fetch('https://controltaxieloy.herokuapp.com/api/web/admin/denuncias')
            .then(res => res.json())
            .then(response => setResponse(response))


    }
    const cargarDefinicionDenuncias = async () => {
        await fetch('https://controltaxieloy.herokuapp.com/api/listadenuncias')
            .then(res => res.json())
            .then(response => setDefinicionDenuncias(response))
    }



    const handleSearch = (value) => {
        setSearch(value)
    }

    const handleChoose = (value) => {
        setChoose(value)
    }

    const handleMonth = (value)=>{
        setMonth(value)
    }

    const selectRol = (value) => {

        if (value === 'todos') {
            const valores = [true, false, false]
            setCheckRol(valores)
        }
        else if (value === 'cliente') {
            const valores = [false, true, false]
            setCheckRol(valores)
        } else if (value === 'conductor') {
            const valores = [false, false, true]
            setCheckRol(valores)
        }

    }

    const selectType = (value) => {

        if (value === 'total-den') {
            const valores = [true, false, false]
            setCheckType(valores)
        }
        else if (value === 'all-den-name') {
            const valores = [false, true, false]
            setCheckType(valores)
        } else if (value === 'specific-den') {
            const valores = [false, false, true]
            setCheckType(valores)
            setMerge(AlgorithmGrafic.mergeDefinicionDenuncias(definicionDenuncias))
        }

    }

    const click = async () => {

        const result = AlgorithmGrafic.data(response.denuncias, definicionDenuncias, checkRol, checkType, month, id, specificDenuncia)
        setInfo(result)
    }


    const handleId = (value) => {
        setId(value)
    }


    const handleSpecificDenuncia = (value) => {
        setSpecificDenuncia(value)
    }

    if (response !== '' && choose === 'licencias') {


        const lista = []

        response.denuncias.map(e => lista.push(e.licencia))/**CONSEGUIMOS TODAS LAS LICENCIAS DE LAS DENUNCIAS */

        var listaLicencias = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR LICENCIA */
    }
    else if (response !== '' && choose === 'matriculas') {

        const lista = []

        response.denuncias.map(e => lista.push(e.matricula))/**CONSEGUIMOS TODAS LAS MATRICULAS DE LAS DENUNCIAS */

        var listaMatriculas = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR MATRICULA */
    }





    useEffect(() => {
        console.log('funciono')
        cargarDenuncias()
        cargarDefinicionDenuncias()
    }, [])


    var i = 0

    return (
        <div>
            <h1>Analisis</h1>
            <div>
                <div className='contenedor-licencias-blacklist-select border'>
                    <div>

                        <input id='search' onChange={(event) => handleSearch(event.target.value)} type="text" placeholder='licencia/matrícula'></input>
                        {/* <button htmlFor='search' onClick={()=>buscarDenunciados(search)}>: Buscar</button> */}
                    </div>
                    <div>
                        <label htmlFor=''>Lista : </label>
                        <button onClick={() => { handleChoose('licencias') }}>Licencias</button>
                        <button onClick={() => { handleChoose('matriculas') }}>Matrículas</button>
                    </div>
                </div>
                <div className='contenedor-analisis'>
                    <div className="contenedor-analisis-options border">
                        <div>
                            <h3>Rol denunciantes</h3>
                            <div>
                                <label>Todas las denuncias</label>
                                <input type="checkbox" value="todos" checked={checkRol[0]} onChange={(event) => { selectRol(event.target.value) }} />
                                <div>
                                </div>
                                <label>Denuncias de clientes</label>
                                <input type="checkbox" value="cliente" checked={checkRol[1]} onChange={(event) => { selectRol(event.target.value) }} />
                            </div>
                            <div>
                                <label>Denuncias de conductores</label>
                                <input type="checkbox" value="conductor" checked={checkRol[2]} onChange={(event) => { selectRol(event.target.value) }} />
                            </div>
                        </div>
                        <div>
                            <h3>Selecciona licencia/Matricula</h3>
                            <select onChange={(event) => { handleId(event.target.value) }}>
                                <option>TODOS</option>
                                {response !== '' ?
                                    choose === 'licencias' ?
                                        listaLicencias.map(e => <option key={`select${i++}`}>{e[0]}</option>) :
                                        listaMatriculas.map(e => <option key={`select${i++}`}>{e[0]}</option>) :
                                    <option>waiting</option>
                                }
                            </select>
                        </div>

                        <div>
                            <h3>Total denuncias</h3>/**GRAFICA LINEAL MESES:_ CANTIDAD:| */
                            <input type="checkbox" value="total-den" checked={checkType[0]} onChange={(event) => { selectType(event.target.value) }} />
                        </div>
                        <div>
                            <h3>Todas Denuncias nombradas</h3>/**GRAFICA BLOQUES DENUNCIAS:_ CANTIDAD:| */
                            <input type="checkbox" value="all-den-name" checked={checkType[1]} onChange={(event) => { selectType(event.target.value) }} />
                            {checkType[1]?
                            <select onChange={(event)=>{handleMonth(event.target.value)}}>
                                <option>Selecciona Mes</option>
                                <option value = '01'>Enero</option>
                                <option value = '02'>Febrero</option>
                                <option value = '03'>Marzo</option>
                                <option value= '04'>Abril</option>
                                <option value= '05'>Mayo</option>
                                <option value= '06'>Junio</option>
                                <option value= '07'>Julio</option>
                                <option value= '08'>Agosto</option>
                                <option value= '09'>Septiembre</option>
                                <option value= '10'>Octubre</option>
                                <option value= '11'>Noviembre</option>
                                <option value= '12'>Diciembre</option>
                            </select>:
                            ''}
                        </div>
                        <div>
                            <h3>Denuncia specífica</h3>/**GRAFICA LINEAL MESES:_ CANTIDAD: | */
                            <input type="checkbox" value="specific-den" checked={checkType[2]} onChange={(event) => { selectType(event.target.value) }} />
                            {checkType[2] ?
                                <select onChange={(event) => { handleSpecificDenuncia(event.target.value) }}>
                                    {checkRol[1] ? definicionDenuncias.cliente.map(e => <option key={`definicion-${i++}`}>{e[1]}</option>) :
                                        checkRol[2] ? definicionDenuncias.conductor.map(e => <option key={`definicion-${i++}`}>{e[1]}</option>) :
                                            merge.map(e => <option key={`definicion-${i++}`}>{e[1]}</option>)}
                                </select>
                                :
                                ''}
                        </div>
                        <br></br>
                        <div>
                            <button onClick={() => { click() }}>Aceptar</button>
                        </div>
                    </div>
                    <div className="contenedor-analisis-graffics border">
                        <Grafics data={info} type={checkType} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analisis