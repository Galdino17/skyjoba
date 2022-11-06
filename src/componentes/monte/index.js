import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useContext, useState, useEffect } from 'react'
import { setMao, setAcao, descartar, cavar } from "../../lib/baralho"
import AnimationDiv from '../animation';
import { JogadorContext, GameContext } from '../AppContext';

export default function Monte(props) {
    const InfoPartida = useContext(GameContext).partida.infoPartida;
        const [cartaUltimoLixo, setUltimoCartaLixo] = useState('vazio')
        
        const cartaLixo = InfoPartida.lixo
        const cartaMonte = InfoPartida.monte
        const jogador_atual = InfoPartida.jogador_atual
        const carta = InfoPartida.mao
        

    useEffect(() => {
        if (!!InfoPartida.monte_lixo) {
            let monteUltimoLixo = InfoPartida.monte_lixo.at(-2)
             if (cartaUltimoLixo != monteUltimoLixo) setUltimoCartaLixo(monteUltimoLixo)
             
            
        }
    }
    , [InfoPartida])




    const jogadorContext = useContext(JogadorContext);
        jogadorContext.setJogador(jogador_atual)
        jogadorContext.Atual.setAtual(jogador_atual)
        const player = jogador_atual
        const jogadorDaVez = jogadorContext.Atual.atual

    



const handleClick = (carta, monte) => {
    console.log(InfoPartida.acao, monte)
    if (player==jogadorDaVez)
        if (InfoPartida.mao=='vazio'){
            setMao(carta, monte, cartaUltimoLixo)
            setAcao('descartar')
        }
        if (InfoPartida.acao=='descartar' && monte=='lixo'){
            let monte_lixo = InfoPartida.monte_lixo
            monte_lixo.push(InfoPartida.mao)
            descartar(monte_lixo)
            setMao('vazio')
            setAcao('virar')
        }
        if (monte=='monte') cavar(InfoPartida.baralho)
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