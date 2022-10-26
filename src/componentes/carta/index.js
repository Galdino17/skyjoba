import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta } from "../../lib/baralho"

import { onValue, ref} from "firebase/database";
import {  database } from "../../lib/baralho";



export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const [valor, setValor] = useState('verso')
    
    const coluna = props.coluna
    const jogador = props.jogador
    const linha = props.linha
    
    onValue(ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha), (snapshot) => {
        const carta = snapshot.val();
        
        if (carta.valor != valor) setValor(carta.valor);
        if (carta.status != virada) setVirada(carta.status);
       
        });

    const clickHandler = () => {
        setVirada('frente')
        vira_carta(jogador, coluna, linha, valor)
       
       }
    

    let style_carta = styles.carta
    if (virada=='frente') style_carta = `${styles.rotated} ${styles.carta}`

    return (
        <div className={styles.cartaContainer}>
        <div className={style_carta} onClick={() => clickHandler()}>
            <div className={styles.frente}>
                    <ImageC src="/img/back.svg"/>
            </div>
            <div className={styles.verso} >
                <ImageC src={"/img/"+valor+".svg"}/>
            </div>
            
        </div>
    </div>
    )
}


export function Frente () {
    return (
        <div className={styles.frente}>
                <ImageC src="/img/back.svg"/>
        </div>
    )
}

export function Verso (props) {
    return (
        <div className={styles.carta} >
                <ImageC src={"/img/"+props.src+".svg"}/>
            </div>
    )
}