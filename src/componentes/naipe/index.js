import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import Coluna from "../coluna";
import { getLastUpdated } from "../../lib/baralho";



export default  function Naipe (props){
    let cartas = [...Array(4)]
    const [placar, setPlacar] = useState(0)

   

return (
    <div className={styles.naipe} >
        <div className={styles.titulo}> Jogador {props.jogador} </div>

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
            <div>Placar Parcial {placar} </div>
            <div>Placar Total {} </div>
        </div>
    </div>
)
}