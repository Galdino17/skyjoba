import React, { useContext, useEffect, useState } from "react";

import styles from './styles.module.css'
import Coluna from "../coluna";

import { JogadorContext, GameContext } from "../AppContext";
import { onValue, ref } from "firebase/database";
import { database } from "../../lib/baralho"



export default function Naipe(props) {

    const jogadorContext = useContext(JogadorContext);
        const player = jogadorContext.jogador
    const ContextoGame = useContext(GameContext);
        const jogador_atual = ContextoGame.partida.infoPartida.jogador_atual
    
    const placar_atual = props.infoNaipe.placar_atual
    const placar_total = props.infoNaipe.placar_total
    const colunas = props.infoNaipe.cartas
        
        
    


    // let titulo = (player==props.jogador) ? styles.titulo : styles.titulo_atual
    let titulo = (player == props.naipe) ? styles.titulo : styles.titulo_atual
    let placar = (jogador_atual == props.naipe) ? styles.placar : `${styles.placar} ${styles.placar_atual}`

    
    
    return (
        <div className={styles.naipe} >
            <div className={titulo}> Jogador {props.naipe}  </div>

            <div className={styles.cartas_tab}>
                {colunas.map((cartas_coluna, index) => (
                    
                    <div key={index}>
                        <Coluna naipe={props.naipe} cartas={cartas_coluna} atual={jogador_atual} player={player} />
                    </div>


                )
                )
                }
            </div>
            <div className={placar}>
                <div key={"parcial"}>Placar Parcial {placar_atual} </div>
                <div key={"total"}>Placar Total {placar_total} </div>
            </div>
        </div>
    )
}