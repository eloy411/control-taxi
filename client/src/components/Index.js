import {useState} from 'react'
import BlackList from './Black-list'
import Denuncias from './Denuncias'
import Analisis from './Analisis'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

function Navbar (){

    
    const [body,setBody] = useState(<BlackList/>)
    
    

    const handlePage = (value) =>{
        if(value === 'black'){
            setBody(<BlackList/>)
        }
        else if(value === 'den'){
            setBody(<Denuncias />)
        }
        else if(value === 'ana'){
            setBody(<Analisis />)
        }
    }

    return(
        <div>
            <div className='nav'>
            <div className='logo'><h1>Control Taxi</h1></div>
            <div className='pestanas'>
            <div><button className='button-32' onClick={()=>handlePage("black")} >Black List</button></div>
            <div><button className='button-32' onClick={()=>handlePage("den")}>Denuncias</button></div>
            <div><button className='button-32' onClick={()=>handlePage("ana")}>Análisis</button></div> 
            </div>
            </div>
            <div>{body}</div>        
        </div>
    )
}
export default Navbar


/**CHARTS  */