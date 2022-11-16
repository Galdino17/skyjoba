import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useContext, useState, useEffect } from 'react'
import { setMao, setAcao, descartar, cavar } from "../../lib/baralho"
import AnimationDiv from '../animation';
import { GameContext } from '../AppContext';

export default function Monte(props) {
    const ContextoGame = useContext(GameContext) 
    const InfoPartida = ContextoGame.partida.infoPartida;
        const [cartaUltimoLixo, setUltimoCartaLixo] = useState('vazio')
        
        const cartaLixo = InfoPartida.lixo
        const cartaMonte = InfoPartida.monte
        const jogador_atual = InfoPartida.jogador_atual
        const carta = InfoPartida.mao
    


    useEffect(() => {
        
        if (!!InfoPartida.monte_lixo) {
            //console.log("Effect Lixo")
            let monteUltimoLixo = InfoPartida.monte_lixo.at(-2)
             if (cartaUltimoLixo != monteUltimoLixo) setUltimoCartaLixo(monteUltimoLixo)
             
            
        }
    }
    , [InfoPartida, cartaUltimoLixo])




    const jogadorContext = ContextoGame.Jogadores;
        jogadorContext.setJogador(jogador_atual)
        jogadorContext.setAtual(jogador_atual)
        const player = jogador_atual
        const jogadorDaVez = jogadorContext.atual

    


const handleClick = (carta, monte) => {
    if (player==jogadorDaVez && InfoPartida.statusGlobal!='inicio') {
        if (InfoPartida.acao=='cavar'){
            setMao(carta, monte, cartaUltimoLixo)
            if (monte=='monte') {
                setAcao('descartar')
                }
            else {
                setAcao('trocar')
            }
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