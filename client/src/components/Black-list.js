import { useState, useEffect } from 'react'
import Algorithm from '../helpers/Algorithm'
import Informacion from './sub-components/Informacion-blacklist'
const initialResponseParams = "none"


function BlackList() {
    const [response, setResponse] = useState(initialResponseParams)
    const [numTop, setNumTop] = useState(10)
    const [top,setTop] = useState('')
    const [choose,setChoose] = useState('licencias')
    const [search,setSearch] = useState('')
    const [denunciado,setDenunciado] = useState(initialResponseParams)

    const cargarDenuncias = async () => {

        await fetch('https://control-taxi.onrender.com/api/web/admin/denuncias')
            .then(res => res.json())
            .then(response => setResponse(response))


    }
    const handleSearch = (value) =>{
        setSearch(value)
    }

    const handleChoose =(value)=> {
            setChoose(value) 
    }

    const handleTopList = (value) =>{
        setNumTop(parseInt(value))
    }

    
    const buscarDenunciados = async (value) =>{

        const requestOptions = {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({identificador:value})
        }
        await fetch('https://control-taxi.onrender.com/api/web/admin/specific-denunciados',requestOptions)
        .then(res=>res.json())
        .then(response=>setDenunciado(response))
        
    }

    const informacion = (event) =>{
        
        buscarDenunciados(event.parentElement.parentElement.childNodes[0].children[1].innerText)
        const topnum = (event.parentElement.parentElement.childNodes[0].children[0].innerText).split('.').join('')
        setTop(topnum)
    }

    if (response.denuncias && choose === 'licencias') {

        const lista = []

        response.denuncias.map(e => lista.push(e.licencia))/**CONSEGUIMOS TODAS LAS LICENCIAS DE LAS DENUNCIAS */

        const listaLicencias = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR LICENCIA */

        const listaCompletaLicenciasOrdenadas = Algorithm.ordenar(listaLicencias)/**ORDENAMOS DE MAS A MENOS */

        var blackL = Algorithm.top(listaCompletaLicenciasOrdenadas, numTop) /**GENERAMOS LISTA NUM-TOP */

    }else if(response.denuncias && choose === 'matriculas'){

        const lista = []

        response.denuncias.map(e => lista.push(e.matricula))/**CONSEGUIMOS TODAS LAS MATRICULAS DE LAS DENUNCIAS */
    
        const listaMatriculas = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR MATRICULA */

        const listaCompletaMatriculasOrdenadas = Algorithm.ordenar(listaMatriculas)/**ORDENAMOS DE MAS A MENOS */

         blackL = Algorithm.top(listaCompletaMatriculasOrdenadas, numTop) /**GENERAMOS LISTA NUM-TOP */
    
    }   
    else {
         blackL = ['cargando', 'cargando', 'cargando']
    }


    useEffect(() => {
        cargarDenuncias()
    }, [])


    
   
    if (response.denuncias) {
        return (
            <div >
                <h1 className='title'>Black List</h1>
                <div className='contenedor-licencias-blacklist-select'>
                    <div>
                    <input id='search' onChange={(event)=>handleSearch(event.target.value)} type="text" placeholder='licencia/matr??cula'></input>
                    <button className='button-30' htmlFor='search' onClick={()=>buscarDenunciados(search)}>: Buscar</button>
                    </div>
                    <div>
                    <label htmlFor=''>Lista : </label>
                    <button className='button-30' onClick={()=>{handleChoose('licencias')}}>Licencias</button>
                    <button className='button-30' onClick={()=>{handleChoose('matriculas')}}>Matr??culas</button>
                    </div>
                    <div>
                        <label htmlFor=''>Numero de Top</label>
                        <select className='select-30' onChange={(event)=>{handleTopList(event.target.value)}}>
                            <option>10</option>
                            <option>5</option>
                            <option>3</option>
                            <option>1</option>
                        </select>
                    </div>
                    <div className='contenedor-licencias-blacklist-select-helper'></div>
                </div>
                <div className='parent-contenedor-blacklist'>
                <div className='contenedor-blacklist'>
                <div className='contenedor-licencias-blacklist'>
                        {blackL.map(e => <div className="licencia-display" key={e[0].toString() + 'blacklist'}>
                        <div className=" licencia-display-sub">
                            <div className='licencia-display-sub-ranking '>
                                <h3>{e[0].toString() + '.'}</h3>
                            </div>
                            <div className='licencia-display-sub-licencia '>
                                <p>{e[1]}</p>
                            </div>
                        </div>
                            <div className='licencia-display-button'>
                                <button className='button-31' onClick={(event)=>informacion(event.target)}>info</button>
                                
                            </div>

                        </div>)}
                </div>
                    <div className='contenedor-info-blacklist '>
                        {<Informacion data={{denunciado,top}}/>}
                    </div>
                </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
            <h1>Black List</h1>
            <h2>Cagando....</h2>
            </div>
        )
    }
}

export default BlackList