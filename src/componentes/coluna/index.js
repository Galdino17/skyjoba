import React from "react";
import Carta from "../carta";
import styles from './styles.module.css'
import { descartarColuna } from "../../lib/baralho";

export default function Coluna (props){
    let cartas = props.cartas
    let coluna = (props.player==props.naipe) ? styles.coluna : `${styles.coluna} ${styles.coluna_atual}`
    if (!!props.monte) descartarColuna(cartas, props.naipe, props.coluna, props.monte)
    

return (
    <div className={coluna} >

 
        {cartas.map( (valor_carta, index) => (
            
                                <Carta key={index} src={valor_carta} naipe={props.naipe} coluna={props.coluna} linha={index} atual={props.atual}/>
                            

                            )
                    )
        }
    
    </div>
)
}