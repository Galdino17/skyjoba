import React, { useState, useContext } from "react"
import ReactDOM from 'react-dom';
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta, database, set_placar } from "../../lib/baralho"

import { onValue, ref } from "firebase/database";
import { JogadorContext } from "../AppContext";


import AnimationDiv from "../animation";


export default function Carta (props){

    const [virada, setVirada] = useState('verso')
    const [valor, setValor] = useState('verso')
    
    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador
    const jogadorDaVez = jogadorContext.Atual.atual
    
    const coluna = props.coluna
    const naipe = props.naipe
    const linha = props.linha


    
    const carta_db = ref(database, '/PartidaTeste/jogadores/'+naipe+'/cartas/c'+coluna+'/'+linha+'/status')
    onValue(carta_db, (snapshot) => {
        let status = snapshot.val();
        if (status != virada) setVirada(status);  
        });

    const valor_db = ref(database, '/PartidaTeste/jogadores/'+naipe+'/cartas/c'+coluna+'/'+linha+'/valor')
    onValue(valor_db, (snapshot) => {
        let value = snapshot.val();
            if (value != valor) {
                setTimeout(() => {
                    setValor(value);
                    
                }, 500);
            }  
            
            });
    

    const clickHandler = () => {
        console.log('Você é o '+player+' clicando no '+naipe+' e é a vez do '+ jogadorDaVez)
        if (player==jogadorDaVez && player==naipe){
            let count = 0
            if (virada==='verso') count=1
            setVirada('frente')
            vira_carta(naipe, coluna, linha, count)
            set_placar(naipe, valor)

        }
        
       
       }
    

    let style_carta = styles.carta
    if (virada=='frente') style_carta = `${styles.rotated} ${styles.carta}`

    

    return (

       

        <AnimationDiv id={naipe+'-'+coluna+'-'+linha}>
        <div className={styles.cartaContainer} >
        <div className={style_carta} onClick={() => clickHandler()}>
            
            <div className={styles.frente}>
            
                    <ImageC src="/img/back.svg"/>
            </div>
            <div className={styles.verso} >
                <ImageC src={"/img/"+valor+".svg"}/>
            </div>
            
        </div>
    </div>
    </AnimationDiv>
    )
}


export function Frente (props) {
    return (
        <div className={styles.frente}>
                <ImageC src="/img/back.svg"/>
        </div>
    )
}

export function Verso (props) {
    return (
        <div className={styles.frente} >
                <ImageC src={"/img/"+props.src+".svg"}/>
            </div>
    )
}