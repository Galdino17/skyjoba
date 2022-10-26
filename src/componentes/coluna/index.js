import React, {useEffect, useState} from "react";
import Carta from "../carta";
import styles from './styles.module.css'
import { getCartasJogador, verifica_coluna, getLastUpdated } from "../../lib/baralho";


export default function Coluna (props){
    
    const [lastUpdated, setLastUpdated] = useState(props.lastUpdated)
    const [cartas, setCartas] = useState([])
    const [cartas_info, setCartasInfo] = useState([])
    
    useEffect(() => {

        const callData = async () => {
            const data = await getCartasJogador(props.jogador, props.coluna).then(data => {
                    let valores = [data[0][0][0], data[0][1][0], data[0][2][0]]
                        
                        if (lastUpdated != data[1]){
                            console.log('++'+lastUpdated)
                            setLastUpdated(data[1])
                            setCartas(valores)
                            setCartasInfo(data)
            
                        } else {
                                console.log("Use effect")
                        }
            })
            }

            callData()
            
    
    }, [props.coluna, props.jogador, lastUpdated]);

   

    
    
    
 
      
 if (cartas.length===0)  return(<> Loading </>)   
 
 if (verifica_coluna(cartas_info)) return(<> </>)  
    
return (
    <div className={styles.coluna} >
 
        {cartas.map( (valor_carta, index) => (
                            <>
                                <Carta src={valor_carta} jogador={props.jogador} coluna={props.coluna} linha={index}/>
                            
                            </>

                            )
                    )
        }
    
    </div>
)
}