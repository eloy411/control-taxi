import { useEffect, useState } from "react"
import Algorithm from '../helpers/Algorithm'
import InformacionDen from "./sub-components/Informacion-denuncias"


function Denuncias() {

    const [response, setResponse] = useState('')
    const [specificDenuncias, setSpecificDenuncias] = useState('none')
    const [search, setSearch] = useState('')
    const [choose, setChoose] = useState('licencias')
    const [specific,setSpecific] = useState('todos')
    
    const [ordenFecha, setOrdenFecha] = useState(true)
    const [ordenGravedad,setOrdenGravedad] = useState([true,false,false])
    const [filtro,setFiltro] = useState([true,false,false])

    const cargarDenuncias = async () => {


        await fetch('https://controltaxieloy.herokuapp.com/api/web/admin/denuncias')
            .then(res => res.json())
            .then(response => setResponse(response))

    }


    const handleChoose = (value,event) => {
        setChoose(value)
        setTimeout(()=>{
            setSpecific(event.parentElement.parentElement.parentElement.parentElement.children[2].firstChild.children[0].children[1].value)
        },100)
        
    }

    const handleSearch = (value) => {
        setSearch(value)
    }
    const specificLicencia = (value) =>{

        setSpecific(value)
    }

    const buscarSpecificDenuncias = (value) => {
        var dataDenuncias
        if(value !== ''){
            dataDenuncias = Algorithm.specificDenunciado(response.denuncias,value,ordenFecha,ordenGravedad,filtro)
            
        }else{
            dataDenuncias = 'none'
        }
        
        
        setSpecificDenuncias(dataDenuncias)
    }


    const ordenarFecha = () =>{
        setOrdenFecha(!ordenFecha)
    }


    const ordenarGravedad = (value) =>{
        if(value === 'default'){
            const valores = [true,false,false]
            setOrdenGravedad(valores)
        }
        else if(value === 'mas-menos'){
            const valores = [false,true,false]
            setOrdenGravedad(valores)
        }else if(value === 'menos-mas'){
            const valores = [false,false,true]
            setOrdenGravedad(valores)
        }

    }

    const filtros = (value) =>{
        if(value === 'todas'){
            const valores = [true,false,false]
            setFiltro(valores)
        }
        else if(value === 'con-img'){
            const valores = [false,true,false]
            setFiltro(valores)
        }
        else if(value === 'sin-img'){
            const valores = [false,false,true]
            setFiltro(valores)

        }
    }



    if (response !== '' && choose === 'licencias') {

        const lista = []

        response.denuncias.map(e => lista.push(e.licencia))/**CONSEGUIMOS TODAS LAS LICENCIAS DE LAS DENUNCIAS */

        var listaLicencias = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR LICENCIA */



    } else if (response !== '' && choose === 'matriculas') {

        const lista = []

        response.denuncias.map(e => lista.push(e.matricula))/**CONSEGUIMOS TODAS LAS MATRICULAS DE LAS DENUNCIAS */

        var listaMatriculas = Algorithm.licenciasDenunciadas(lista)/**QUITAMOS REPETIDAS Y CONTABILIZAMOS NUM DENUNCIAS POR MATRICULA */
    }


    useEffect(() => {

        cargarDenuncias()

    }, [])


    var i = 0

    return (
        <div>
            <h1>Denuncias</h1>
            <div className="contenedor-denuncias-top border">
                <div className="contenedor-denuncias-top-select">
                <div>
                    <input id='search' onChange={(event) => handleSearch(event.target.value)} type="text" placeholder='licencia/matrícula'></input>
                    <button htmlFor='search' onClick={() => buscarSpecificDenuncias(search)}>: Buscar</button>
                </div>
                <div>
                    <label htmlFor=''>Lista : </label>
                    <button onClick={(event) => { handleChoose('licencias',event.target) }}>Licencias</button>
                    <button onClick={(event) => { handleChoose('matriculas',event.target) }}>Matrículas</button>
                </div>
                </div>
                <div className='contenedor-denuncias-top-tittle'><h2>{specific}</h2></div>
            </div>
            <div className="contenedor-denuncias">

                <div className="container-denuncias-options border">
                    

                    <div>
                        <h3>Selecciona identificación </h3>
                        <select onChange={(event) => specificLicencia(event.target.value)}>
                            <option value="todos">Selecciona identificador</option>
                            <option value="todos">Todos</option>
                            {response !== '' ?
                                choose === 'licencias' ?
                                    listaLicencias.map(e => <option key={`select${i++}`}>{e[0]}</option>) :
                                    listaMatriculas.map(e => <option key={`select${i++}`}>{e[0]}</option>) :
                                <option>waiting</option>
                            }

                        </select>
                    </div>
                    <div>
    
                        <div>
                        <h3>Orden temporal</h3>
                        <div>
                        <label htmlFor="tiempo">Ordenar de mas nueva a mas antigua:</label>
                        <input id="tiempo" type="checkbox" checked={ordenFecha} onChange={()=>{ordenarFecha()}}/>
                        </div>
                        </div>
                        <div>
                        <h3>Orden de gravedad</h3>
                        <div>
                        <label htmlFor="default-check">Por defecto:</label>
                        <input id="default-check" type="checkbox"  value="default" checked={ordenGravedad[0]} onChange={(event)=>{ordenarGravedad(event.target.value)}}/>
                        </div>
                        <div>
                        <label htmlFor="mas-menos-check">Ordenar de mas grave a menos grave:</label>
                        <input id="mas-menos-check" type="checkbox" value="mas-menos" checked={ordenGravedad[1]} onChange={(event)=>{ordenarGravedad(event.target.value)}}/>
                        </div>
                        <div>
                        <label htmlFor="menos-mas-check">Ordenar de menos grave a mas grave:</label>
                        <input id="menos-mas-check" type="checkbox" value="menos-mas" checked={ordenGravedad[2]} onChange={(event)=>{ordenarGravedad(event.target.value)}}/>
                        </div>
                        </div>
                        <div>
                        <h3>filtros Imagen</h3>
                        <div>
                        <label>Todas</label>
                        <input id="todas-check" value="todas" type="checkbox" checked={filtro[0]} onChange={(event)=>{filtros(event.target.value)}}/>
                        </div>
                        <div>
                        <label >Con imagen</label>
                        <input id="con-imagen-chek" value="con-img" type="checkbox" checked={filtro[1]} onChange={(event)=>{filtros(event.target.value)}}/>
                        </div>
                        <div>
                        <label>Sín imagen</label>
                        <input id="sin imagen" value="sin-img" type="checkbox" checked={filtro[2]} onChange={(event)=>{filtros(event.target.value)}}/>
                        </div>
                        </div>
                        
                        
                    </div>
                    <br></br>
                    <div>
                    <button onClick={()=>{buscarSpecificDenuncias(specific)}}>Aceptar</button>
                    </div>
                </div>
                
                    <div className="border blocke">
                        <InformacionDen data={specificDenuncias} total={specific}/>
                    </div>
                
            </div>
        </div>
    )
}

export default Denuncias