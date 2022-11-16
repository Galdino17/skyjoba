import React, { useContext, useState } from "react";

import styles from './styles.module.css'
import Coluna from "../coluna";

import {  GameContext } from "../AppContext";
import { atualiza_quantidade_viradas, viraTodasCastas } from "../../lib/baralho"



export default function Naipe(props) {
    
    const ContextoGame = useContext(GameContext);
        const jogador_atual = ContextoGame.partida.infoPartida.jogador_atual

    const jogadorContext = ContextoGame.Jogadores;
        const player = jogadorContext.jogador
    
    const placar_atual = props.infoNaipe.placar_atual
    const placar_total = props.infoNaipe.placar_total
    const colunas = props.infoNaipe.cartas
    const monte = ContextoGame.partida.infoPartida.baralho
    const quantidadeViradas = props.infoNaipe.viradas
    const statusGlobal = ContextoGame.partida.infoPartida.statusGlobal
        
     
    

    

    let titulo = (player == props.naipe) ? styles.titulo : `${styles.titulo} ${styles.titulo_atual}`
    let placar = (jogador_atual == props.naipe) ? styles.placar : `${styles.placar} ${styles.placar_atual}`
    let placarStyle = (quantidadeViradas!=0) ? placar : `${styles.placar}  ${styles.placarFinalizado}`
    let tituloStyle = (quantidadeViradas!=0) ? titulo : `${styles.placar}  ${styles.tituloFinalizado}`

    atualiza_quantidade_viradas(colunas, props.naipe, statusGlobal)
    


    return (
        <div className={styles.naipe} >
            <div className={tituloStyle}> Jogador {props.naipe}  </div>

            <div className={styles.cartas_tab}>
                {colunas.map((cartas_coluna, index) => (
                    
                    <div key={index}>
                        <Coluna naipe={props.naipe} cartas={cartas_coluna} coluna={index} atual={jogador_atual} player={player} monte={monte}/>
                    </div>


                )
                )
                }
            </div>
            <div className={placarStyle}>
                <div key={"parcial"}>Placar Parcial {placar_atual} </div>
                <div key={"total"}>Placar Total {placar_total} </div>
            </div>
        </div>
    )
}