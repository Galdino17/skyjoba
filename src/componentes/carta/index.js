import React, { useState } from "react"
import ImageC from "../image"
import styles from './styles.module.css'

let socket;


export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const valor = props.src
    const coluna = props.coluna
    const jogador = props.jogador

    const clickHandler = () => {
        setVirada('frente')
       
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


export function Verso () {
    return (
        <div className={styles.verso}>
                <ImageC src="/img/back.svg"/>
        </div>
    )
}

export function Frente (props) {
    return (
        <div className={styles.carta} >
                <ImageC src={"/img/"+props.src+".svg"}/>
            </div>
    )
}