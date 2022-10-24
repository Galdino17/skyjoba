import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import Coluna from "../coluna";




export default  function Naipe (props){
    let cartas = [...Array(4)]
return (
    <div className={styles.naipe} >
        <div className={styles.titulo}> Jogador {props.jogador} </div>

        <div className={styles.cartas_tab}>    
            {cartas.map(( (cartas_coluna, index) =>(
                                <>
                                    <Coluna jogador={props.jogador} index={index} />
                                
                                </>

                                )
                        ))
            }
        </div>
        <div className={styles.placar}>
            <div>Placar Parcial </div>
            <div>Placar Total {} </div>
        </div>
    </div>
)
}