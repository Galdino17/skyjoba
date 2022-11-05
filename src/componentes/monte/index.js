import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useContext, useState, useEffect } from 'react'
import { setMao, setAcao } from "../../lib/baralho"
import AnimationDiv from '../animation';
import { JogadorContext, GameContext } from '../AppContext';

export default function Monte(props) {
    const ContextoGame = useContext(GameContext);
        const [cartaUltimoLixo, setUltimoCartaLixo] = useState('vazio')
        
        const cartaLixo = ContextoGame.partida.infoPartida.lixo
        const cartaMonte = ContextoGame.partida.infoPartida.monte
        const jogador_atual = ContextoGame.partida.infoPartida.jogador_atual
        const carta = ContextoGame.partida.infoPartida.mao
        

    useEffect(() => {
        if (!!ContextoGame.partida.infoPartida.monte_lixo) {
            let monteUltimoLixo = ContextoGame.partida.infoPartida.monte_lixo.at(-2)
             if (cartaUltimoLixo != monteUltimoLixo) setUltimoCartaLixo(monteUltimoLixo)
             
            
        }
    }
    , [ContextoGame])




    const jogadorContext = useContext(JogadorContext);
        jogadorContext.setJogador(jogador_atual)
        jogadorContext.Atual.setAtual(jogador_atual)
        const player = jogador_atual
        const jogadorDaVez = jogadorContext.Atual.atual

    



const handleClick = (carta, monte) => {
    if (player==jogadorDaVez && ContextoGame.partida.infoPartida.mao=='vazio'){
        
        setMao(carta, monte, cartaUltimoLixo)
        setAcao('agir')
    }


}

const Titulo = ({Texto}) =>{
    return(<div className={styles.titulo}> {Texto} </div>)
}



    
return (
    <div className={styles.monte}>
        
        <div className={styles.cartaContainer} onClick={() => handleClick(cartaMonte,'monte')}>
            <AnimationDiv id={'monte'}>
                <div className={styles.carta}>
                    <Frente />
                </div>
            </AnimationDiv>
            <Titulo Texto='Monte'/>
        </div>

        <div className={styles.cartaContainer}>
            <AnimationDiv id={'mao'}>
                <div className={styles.carta}>
                    <Verso src={carta}/>
                </div>
            </AnimationDiv>
            <Titulo Texto='Mão'/>
        </div>

        <div className={styles.cartaContainer} onClick={() => handleClick(cartaLixo,'lixo')} >
            <AnimationDiv id={'lixo'}>  
                <div className={styles.carta}>
                    <Verso src={cartaLixo}/>
                </div>
            </AnimationDiv>
            <Titulo Texto='Lixo'/>
        </div>
        
    </div> 

    
)

}