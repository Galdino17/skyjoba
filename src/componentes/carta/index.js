import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta } from "../../lib/baralho"

import { onValue, ref} from "firebase/database";
import {  database } from "../../lib/baralho";
import { JogadorContext } from "../AppContext";



export default function Carta (props){
    const [virada, setVirada] = useState('verso')
    const [valor, setValor] = useState(0)
    const [jogador_atual, setAtual] = useState(0)
    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador
    
    const coluna = props.coluna
    const jogador = props.jogador
    const linha = props.linha
    
    onValue(ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha), (snapshot) => {
        const carta = snapshot.val();

       // if (carta.valor != valor) setValor(carta.valor);
       // if (carta.status != virada) setVirada(carta.status);
        console.log('++', valor, virada)
        console.log(carta)
       
        }, (error) => {
            console.error(error);
          });
    
    onValue(ref(database, '/PartidaTeste/jogador_atual'), (snapshot) => {
            let jogadorAtual = snapshot.val();
          //  if (jogadorAtual != jogador_atual) setAtual(parseInt(jogadorAtual));
           
            }, (error) => {
                console.error(error);
              } );

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