import React, {useContext, useState} from "react";
import styles from './styles.module.css'
import Coluna from "../coluna";
import { JogadorContext } from "../AppContext";



export default  function Naipe (props){
    let cartas = [...Array(4)]
    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador

   
    let titulo = (player==props.jogador) ? styles.titulo : styles.titulo_atual
return (
    <div className={styles.naipe} >
        <div className={titulo}> Jogador {props.jogador} </div>

        <div className={styles.cartas_tab}>    
            {cartas.map(( (cartas_coluna, index) =>(
                                <>
                                    <Coluna jogador={props.jogador} coluna={index} />
                                
                                </>

                                )
                        ))
            }
        </div>
        <div className={styles.placar}>
            <div>Placar Parcial {} </div>
            <div>Placar Total {} </div>
        </div>
    </div>
)
}