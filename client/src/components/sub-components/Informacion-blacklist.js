

function Informacion(props){
    
    // console.log(props.data.denunciado)
    return(
        <div>
            {props.data.denunciado === "none" || props.data.denunciado?.message === "none"?
            <div className="info-default">
                <h2>Selecciona una licencia</h2>
            </div>
            :
            <div>
                <div className="info-default">
                    <h2>{'licencia TOP: ' + props.data.top}</h2>
                </div>
                <ul>
                    <li>Licencia: <b>{props.data.denunciado.licencia}</b></li>
                    <li>Matrícula: <b>{props.data.denunciado.matricula}</b></li>
                    <li>Número total de denuncias sin imagen: <b>{props.data.denunciado.totalDenSinImg}</b></li>
                    <li>Número total de denuncias con imagen: <b>{props.data.denunciado.totalDenConImg}</b></li>
                    <li>Información segura: <b>{props.data.denunciado.infoConfirmada?'SI':'NO'}</b></li>
                </ul>
                </div>}
        </div>
        
        
    )
}

export default Informacion