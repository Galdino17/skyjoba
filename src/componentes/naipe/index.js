import React from "react";
import Carta from "../carta";
import styles from './styles.module.css'


export default function Naipe (props){

    const array = props.array
return (
    <div className={styles.naipe} >
        <div className={styles.titulo}> Jogador </div>

    <div className={styles.cartas_tab}>    
        {array.map((v,i)=>(
                            <>
                                <Carta src={(i-2)}/>
                            
                            </>

                            )
                    )
        }
    </div>
    <div className={styles.placar}>
        <div>Placar Parcial</div>
        <div>Placar Total</div>
    </div>
    </div>
)
}