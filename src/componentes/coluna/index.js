import React from "react";
import Carta from "../carta";
import styles from './styles.module.css'

export default function Coluna (props){
    let cartas = props.cartas
    let coluna = (props.player==props.naipe) ? styles.coluna : `${styles.coluna} ${styles.coluna_atual}`


return (
    <div className={coluna} >

 
        {cartas.map( (valor_carta, index) => (
            
                                <Carta key={index} src={valor_carta} naipe={props.naipe} coluna={index} linha={index} atual={props.atual}/>
                            

                            )
                    )
        }
    
    </div>
)
}