import React, {  useContext } from "react"
import ImageC from "../image"
import styles from './styles.module.css'
import { vira_carta, descartar, atualizaJogadorAtual, trocarValorDaCarta } from "../../lib/baralho"
import { GameContext, JogadorContext } from "../AppContext";


import AnimationDiv from "../animation";


export default function Carta (props){
    const valor = props.src.valor
    const virada = props.src.status
    
    const Game = useContext(GameContext)
    const ContextoGame = Game.partida.infoPartida
        const mao = ContextoGame.mao
        const acao = ContextoGame.acao
    const Animation = Game.animate
    const animando = Game.animando
    
    const jogadorContext = Game.Jogadores;
        const player = jogadorContext.jogador
        const jogadorDaVez = jogadorContext.atual
        
    const coluna = props.coluna
    const naipe = props.naipe
    const linha = props.linha
    
    

    const descartar_carta = (mao) => {
        let monte_lixo = ContextoGame.monte_lixo
        monte_lixo.push(mao)
        descartar(monte_lixo)
    }

    const clickHandler = () => {
        if (player==jogadorDaVez && player==naipe && !animando){
            
                if (ContextoGame.statusGlobal == 'inicio') {
                    if (virada=='verso') {
                        vira_carta(naipe, coluna, linha)
                        atualizaJogadorAtual(naipe, ContextoGame)
                        Game.setAtualiza(true)
                    }
        
                } else switch (acao) {
                    case 'virar':
                        if (virada=='verso') vira_carta(naipe, coluna, linha)
                        atualizaJogadorAtual(naipe, ContextoGame)
                        Game.setAtualiza(true)
                        break
                    
                    case 'descartar':
                    case 'trocar':
                        trocarValorDaCarta(naipe, coluna, linha, mao)
                        atualizaJogadorAtual(naipe, ContextoGame)
                        descartar_carta(valor)
                        Animation.setAnimation('c'+naipe+'-'+coluna+'-'+linha)
                        Game.setAtualiza(true)
                        break

                    case 'cavar':
                        Game.setAtualiza(false)
                        Animation.setAnimation('monte-lixo')
                        break
                }

            }
    
          


        }
        // Cavar e virar
        
        
       
       
    

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