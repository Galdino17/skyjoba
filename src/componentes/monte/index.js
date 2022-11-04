import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useState, useContext, useEffect } from 'react'
import { set_mao } from "../../lib/baralho"
import AnimationDiv from '../animation';
import { JogadorContext, GameContext } from '../AppContext';

export default function Monte(props) {
    const ContextoGame = useContext(GameContext);
        const carta_lixo = ContextoGame.partida.infoPartida.lixo
        const carta_monte = ContextoGame.partida.infoPartida.monte
        const jogador_atual = ContextoGame.partida.infoPartida.jogador_atual

    const [carta, setCarta] = useState('vazio')

    const jogadorContext = useContext(JogadorContext);
        jogadorContext.setJogador(jogador_atual)
        jogadorContext.Atual.setAtual(jogador_atual)
        const player = jogador_atual
        const jogadorDaVez = jogadorContext.Atual.atual





const handleClick = (carta) => {
    console.log('Você é o '+player+' e é a vez do '+ jogadorDaVez)
    if (player==jogadorDaVez){
        setCarta(carta)
        set_mao(carta)
    }


}

const Titulo = ({Texto}) =>{
    return(<div className={styles.titulo}> {Texto} </div>)
}



    
return (
    <div className={styles.monte}>
        
        <div className={styles.cartaContainer} onClick={() => handleClick(carta_monte)}>
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

        <div className={styles.cartaContainer} onClick={() => handleClick(carta_lixo)} >
            <AnimationDiv id={'lixo'}>  
                <div className={styles.carta}>
                    <Verso src={carta_lixo}/>
                </div>
            </AnimationDiv>
            <Titulo Texto='Lixo'/>
        </div>
        
    </div> 

    
)

}