import React, { useState } from "react"
import ImageC from "../image"
import styles from './styles.module.css'


export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    

    let style_carta = styles.carta
    if (virada=='frente') style_carta = `${styles.rotated} ${styles.carta}`

    return (
        <div className={styles.cartaContainer}>
        <div className={style_carta} onClick={() => setVirada('frente')}>
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