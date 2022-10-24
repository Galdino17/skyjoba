import React, {useEffect, useState} from "react";
import Carta from "../carta";
import styles from './styles.module.css'
import { getCartasJogador } from "../../lib/baralho";


export default function Coluna (props){
   
    const [cartas, setCartas] = useState([])
    
    useEffect(() => {
        const callData = async () => {
            
            const data = await getCartasJogador(props.jogador, props.index).then(data => data)
         
            setCartas(data)
      
          }

          callData()
      }, [props.jogador, props.index]);
 
      
 if (cartas.length===0)  return(<> Loading </>)   
 console.log('g-'+cartas) 
    
return (
    <div className={styles.coluna} >
 
        {cartas.map( (valor_carta, index) => (
                            <>
                                <Carta src={valor_carta} id={props.jogador+'-'+props.coluna+'-'+index+1}/>
                            
                            </>

                            )
                    )
        }
    
    </div>
)
}