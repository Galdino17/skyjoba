import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta } from "../../lib/baralho"



export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const valor = props.src
    const coluna = props.coluna
    const jogador = props.jogador
    const linha = props.linha

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
                <ImageC src={"/img/"+props.src+".svg"}/>
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