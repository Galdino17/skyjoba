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
        console.log(player, jogadorDaVez, player, naipe)
        if (player==jogadorDaVez && player==naipe){
                if (ContextoGame.statusGlobal == 'inicio') {
                    console.log(virada)
                    if (virada=='verso') {
                        vira_carta(naipe, coluna, linha)
                        atualizaJogadorAtual(naipe, ContextoGame, Game.setModalOpen)
                    }
        
                } else switch (acao) {
                    case 'virar':
                        if (virada=='verso') vira_carta(naipe, coluna, linha)
                        atualizaJogadorAtual(naipe, ContextoGame, Game.setModalOpen)
                        break
                    
                    case 'descartar':
                    case 'trocar':
                        trocarValorDaCarta(naipe, coluna, linha, mao)
                        atualizaJogadorAtual(naipe, ContextoGame, Game.setModalOpen)
                        descartar_carta(valor)
                        break

                    case 'cavar':
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