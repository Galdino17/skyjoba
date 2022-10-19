import React, { useState } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import io from 'socket.io-client'
let socket;


export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const valor = props.src
    const coluna = props.coluna
    const jogador = props.jogador

    const clickHandler = () => {
        let e = 'Jogador: '+props.jogador+' - Valor: '+props.src+' Linha: ? '+'Coluna ?'
        setVirada('frente')
        socket = io()
         socket.emit('input-change', e)
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