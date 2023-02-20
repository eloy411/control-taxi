import { useEffect, useState } from "react"


const defaultDenunciante = {
    rol: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    numDenuncias:'',
    numDenunciasImagen:'',
    veracidad:''

}

function InformacionDen(props) {

    const [denunciante, setDenunciante] = useState(defaultDenunciante)
    const [descripcion, setDescripcion] = useState('sin descripción')
    const [infoContenedor,setInfoContenedor] = useState({})
    const [fix,setFix] = useState(false)
    const [initial,setInitial] = useState(false)

    // window.addEventListener('scroll')
    const buscarSpecificDenunciante = async (value, value2) => {

        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ identificador: value })
        }

        await fetch('https://control-taxi.onrender.com/api/web/admin/specific-denunciante', options)
            .then(res => res.json())
            .then(response => setDenunciante(response))


        setDescripcion(value2)
    }
    
    useEffect(()=>{
        setInfoContenedor(document.getElementById('infotable'))
        setInitial(true)
       
    },[])



    

       function prueba(){
        if(initial){
            if(window.scrollY > infoContenedor.getBoundingClientRect().top + 170){
                
                setFix(true)
            }else{
                
                setFix(false)
            }}
        }
               
 
    
       window.addEventListener('scroll',prueba)
    
   
    
    var i = 0

    return (
        <div className="contenedor-denuncias-tabla-info">
            <div className="pre-table">
                <div className="table">
                    {props.data !== 'none' ?
                        <table className="" >
                            <thead className="">
                                <th className="cabecera">Fecha</th>
                                <th className="cabecera">Motivo</th>
                                <th className="cabecera">Imagen</th>

                                <th className="cabecera">Licencia/Matricula</th>


                                <th className="cabecera padding-opciones">Opciones denuncia</th>

                            </thead>
                            {props.data.map(e =>
                                <tbody className={`nivel-${e.nivel[0]}`} key={`fila-${i++}`}>
                                    <td className="padding-row">{e.createdAt}</td>
                                    <td className="padding-row">{e.infraccion}</td>
                                    <td className="padding-row">{<a href={e.imagen.length !== 0 ? e.imagen[1] : '#'} target="_blank" rel="noopener noreferrer">{e.imagen.length !== 0 ? "Clik para ver imagen" : "Sín imagen"}</a>}</td>
                                    <td className="padding-row">{`${e.licencia} || ${e.matricula}`}</td>

                                    <td className="padding-opciones">
                                        <button onClick={() => { buscarSpecificDenunciante(e.denunciante, e.explicacion) }}>+Info</button>
                                        <button>Enviar</button>
                                    </td>

                                </tbody>
                            )}
                        </table>
                        : <h1>No hay datos</h1>}
                </div>
            </div>
            <div id='infotable' className={!fix?"table-info infotable":"table-info infotable-fixed"}>
                <div className="descripcion">
                    <h3 className="margin-denuncias">Descripción</h3>
                    <p className="margin-denuncias">{descripcion}</p>
                </div>
                <div>
                    <h3 className="margin-denuncias">Denunciante</h3>
                    <ul>
                    <li>Rol: <b>{denunciante.rol}</b></li>
                        <li>Nombre: <b>{denunciante.nombre}</b></li>
                        <li>Apellido: <b>{denunciante.apellido}</b></li>
                        <li>Telefono: <b>{denunciante.telefono}</b></li>
                        <li>Email: <b>{denunciante.email}</b></li>
                        <li>Total denuncias sin imagen: <b>{denunciante.numDenuncias}</b></li>
                        <li>Total denuncias con imagen: <b>{denunciante.numDenunciasImagen}</b></li>
                        <li>Veracidad: <b>{denunciante.veracidad}</b></li>
                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default InformacionDen