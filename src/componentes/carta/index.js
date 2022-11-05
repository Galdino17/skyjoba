import React, { useState, useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta, setAcao, setMao, descartar } from "../../lib/baralho"
import { GameContext, JogadorContext } from "../AppContext";


import AnimationDiv from "../animation";


export default function Carta (props){

    //const [virada, setVirada] = useState(props.src.status)
    const valor = props.src.valor
    const virada = props.src.status
    
    const jogadorContext = useContext(JogadorContext);
        const player = jogadorContext.jogador
        const jogadorDaVez = jogadorContext.Atual.atual
    
    const ContextoGame = useContext(GameContext)
        const mao = ContextoGame.partida.infoPartida.mao
        const acao = ContextoGame.partida.infoPartida.acao
    
    const coluna = props.coluna
    const naipe = props.naipe
    const linha = props.linha
    

    const descartar_carta = (mao) => {
        let monte_lixo = ContextoGame.partida.infoPartida.monte_lixo
        monte_lixo.push(mao)
        descartar(monte_lixo)
    }

    const clickHandler = () => {
        if (player==jogadorDaVez && player==naipe){

            if (mao=='vazio') {
                if (acao!='cavar'){
                    if (virada=='verso') vira_carta(naipe, coluna, linha, 1)
                    
                }
                
    
            }
    
            // Cavar e trocar
            else {
                
                vira_carta(naipe, coluna, linha, 1)
                
                descartar_carta(mao)
                setMao('vazio')
    
            }


        }
        // Cavar e virar
        
        
       
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