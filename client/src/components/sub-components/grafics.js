

import { useEffect, useState } from "react"
import { Line,Bar } from "react-chartjs-2"
import Algorithm from "../../helpers/Algorithm"

function Grafics(props) {

    console.log(props.data)
    const [labels,setLabels] = useState('')

    if((props.type[0] || props.type[2]) && props.data !== 'not Data'){

        

        var scores = []

        for(let i = 0;i <props.data.length;i++){

            scores.push(props.data[i][1])
        }

        var response = Algorithm.ordenar(props.data)
        var maxim = (Math.round(response[0][1]/15) + 15)

        var options = {
            scales:{
                yAxes:{
                    min:0,
                    max:maxim
                }

                
            }
        }
        var label = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
    }
    else if(props.type[1]){
        var scores = []
        var label = []

        for(let i = 0;i <props.data.length;i++){

            scores.push(props.data[i][1])
            label.push(props.data[i][0][1])
        }
        var response = Algorithm.ordenar(props.data)
        var maxim = (Math.round(response[0][1]/5) + 5)

        var options = {
            scales:{
                yAxes:{
                    min:0,
                    max:maxim
                }

                
            }
        }
    }
 
    else{
        var scores = [0]
        var label = [0]
    }

    

    useEffect(()=>{
        

        setLabels({

            labels:label,
            datasets:[
                {
                    label: "Cantidad de Denuncias",
                    data: scores,
                    tension:0.2
                }
            ]
    
        })


    },[props.data])
    

    


if(labels!==''){
    return (
        <div>{props.type[1]?
            <Bar data={labels} options={options}/>
            :<Line data={labels} options={options}/>}
            </div>
        )
}
    
    
}

export default Grafics