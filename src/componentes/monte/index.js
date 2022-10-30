import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useState, useContext } from 'react'
import { onValue, ref } from "firebase/database";
import { database, set_mao } from "../../lib/baralho"
import AnimationDiv from '../animation';
import { JogadorContext } from '../AppContext';

export default function Monte(props) {
const [carta, setCarta] = useState('vazio')
const jogadorContext = useContext(JogadorContext);
const player = jogadorContext.jogador
const naipe = props.naipe
const jogadorDaVez = jogadorContext.Atual.atual

const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
onValue(jogador_db, (snapshot) => {
        if (snapshot.val() != jogadorDaVez) jogadorContext.Atual.setAtual(snapshot.val());
        } );


const handleClick = (carta) => {
    console.log('Você é o '+player+' e é a vez do '+ jogadorDaVez)
    if (player==jogadorDaVez){
        setCarta(carta)
        set_mao(carta)
    }


}




const mao_db = ref(database, '/PartidaTeste/mao')
    onValue(mao_db, (snapshot) => {

            let mao = snapshot.val();
            if (mao != carta) setCarta(mao);
            
            } );
    
return (
    <div className={styles.monte}>
        
        <div className={styles.cartaContainer} onClick={() => handleClick(props.monte)}>
            <AnimationDiv id={'monte'}>
                <div className={styles.carta}>
                    <Frente />
                </div>
            </AnimationDiv>
                <div className={styles.titulo}> Monte </div>
        </div>

        <div className={styles.cartaContainer}>
            <AnimationDiv id={'mao'}>
                <div className={styles.carta}>
                    <Verso src={carta}/>
                </div>
            </AnimationDiv>
            <div className={styles.titulo}> Mão </div>
        </div>

        <div className={styles.cartaContainer} onClick={() => handleClick(props.lixo)} >
            <AnimationDiv id={'lixo'}>  
                <div className={styles.carta}>
                    <Verso src={props.lixo}/>
                </div>
            </AnimationDiv>
            <div className={styles.titulo}> Lixo </div>
        </div>
        
    </div> 

    
)

}