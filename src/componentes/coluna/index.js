import React, {useEffect, useState} from "react";
import Carta from "../carta";
import styles from './styles.module.css'
import { getCartasJogador, verifica_coluna, getLastUpdated } from "../../lib/baralho";


export default function Coluna (props){
    let cartas = [...Array(3)]

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