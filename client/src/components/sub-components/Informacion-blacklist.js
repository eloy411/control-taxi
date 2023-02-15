

function Informacion(props){
    
    
    return(
        <div>
            {props.data === "none" || props.data?.message === "none"?
            <div>
                <h2>No hay datos</h2>
            </div>
            :
            <div>
                <ul>
                    <li>Licencia :{props.data.licencia}</li>
                    <li>Matrícula :{props.data.matricula}</li>
                    <li>Número total de denuncias sin imagen :{props.data.totalDenSinImg}</li>
                    <li>Número total de denuncias con imagen :{props.data.totalDenConImg}</li>
                    <li>Información segura :{props.data.infoConfirmada?'SI':'NO'}</li>
                </ul>
                </div>}
        </div>
        
        
    )
}

export default Informacion