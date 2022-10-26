import React, {useEffect, useState} from "react";
import Carta from "../carta";
import styles from './styles.module.css'
import { getCartasJogador, verifica_coluna, getLastUpdated } from "../../lib/baralho";


export default function Coluna (props){
    let cartas = [...Array(3)]
    let coluna = (props.player==props.jogador) ? styles.coluna : `${styles.coluna} ${styles.coluna_atual}`

return (
    <div className={coluna} >
 
        {cartas.map( (valor_carta, index) => (
                            <>
                                <Carta src={valor_carta} jogador={props.jogador} coluna={props.coluna} linha={index} atual={props.atual}/>
                            
                            </>

                            )
                    )
        }
    
    </div>
)
}