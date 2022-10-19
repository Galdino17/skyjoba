import React from "react";
import styles from './styles.module.css'
import Coluna from "../coluna";
import { getCartas } from "../../lib/baralho";


export default function Naipe (props){

    const cartas = props.cartas
    
    console.log("Jogador: "+props.jogador+"Cartas: "+cartas)
return (
    <div className={styles.naipe} >
        <div className={styles.titulo}> Jogador {props.jogador} </div>

        <div className={styles.cartas_tab}>    
            {cartas.map(( cartas_coluna =>(
                                <>
                                    <Coluna cartas={cartas_coluna}/>
                                
                                </>

                                )
                        ))
            }
        </div>
        <div className={styles.placar}>
            <div>Placar Parcial</div>
            <div>Placar Total</div>
        </div>
    </div>
)
}