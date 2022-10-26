import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta, database, set_placar } from "../../lib/baralho"

import { onValue, ref } from "firebase/database";
import { JogadorContext } from "../AppContext";



export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const [valor, setValor] = useState('verso')
    const [jogador_atual, setAtual] = useState(props.atual)
    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador
    
    const coluna = props.coluna
    const jogador = props.jogador
    const linha = props.linha

    const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
    onValue(jogador_db, (snapshot) => {
            let jogadorAtual = snapshot.val();
            if (jogadorAtual != jogador_atual) setAtual(parseInt(jogadorAtual));
            
            } );
    
    const carta_db = ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha+'/status')
    onValue(carta_db, (snapshot) => {
        let status = snapshot.val();
        if (status != virada) setVirada(status);  
        });

    const valor_db = ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha+'/valor')
    onValue(valor_db, (snapshot) => {
        let value = snapshot.val();
            if (value != valor) setValor(value);  
            });
    

    const clickHandler = () => {
        if (player==jogador_atual && player==jogador){
            let count = 0
            if (virada==='verso') count=1
            setVirada('frente')
            vira_carta(jogador, coluna, linha, count)
            set_placar(jogador, valor)

        }
        
       
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