import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta, database, onValue_gerado } from "../../lib/baralho"

import { onValue, ref } from "firebase/database";
import { JogadorContext } from "../AppContext";



export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const [valor, setValor] = useState('verso')
    const [jogador_atual, setAtual] = useState(0)
    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador
    
    const coluna = props.coluna
    const jogador = props.jogador
    const linha = props.linha
    
    const carta_db = ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha)
    console.log(onValue_gerado(carta_db))
    // onValue(carta_db, (snapshot) => {
    //     const carta = snapshot.val();
    //     console.log(carta)
      
    //    // if (carta.valor != valor) setValor(carta.valor);
    //    // if (carta.status != virada) setVirada(carta.status);
       
    //     }, (error) => {
    //         console.error(error);
    //       });
    
    const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
    console.log(onValue_gerado(jogador_db))
    // onValue(jogador_db, (snapshot) => {
    //         let jogadorAtual = snapshot.val();
    //      //   if (jogadorAtual != jogador_atual) setAtual(parseInt(jogadorAtual));
           
    //         }, (error) => {
    //             console.error(error);
    //           } );

    const clickHandler = () => {
        console.log(player, jogador_atual)
        if (player==jogador_atual){
            setVirada('frente')
            vira_carta(jogador, coluna, linha, valor)

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