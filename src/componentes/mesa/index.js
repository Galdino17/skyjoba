import { useState, useContext, useEffect } from 'react';


import Naipe from '../naipe'
import Monte from '../monte'
import styles from './styles.module.css'


import { onValue} from "firebase/database";
import {  lastUpdated, partida as partida_ref, monte, lixo, animation as animation_ref } from "../../lib/baralho";
import { JogadorContext, LocationContext, GameContext } from "../AppContext";


export default  function Mesa(props) {
    const jogadorContext = useContext(JogadorContext);
    const AnimationContext = useContext(LocationContext);
    const Contexto_game = useContext(GameContext);
    const [carta_lixo, setLixo] = useState('vazio')
    const [carta_monte, setMonte] = useState('vazio')
    const [partida, setPartida] = useState('vazio')

    const HandleChange = (valor) => {
        jogadorContext.setJogador(parseInt(valor))
        
      }

    useEffect(()=>{
        let updatedUseEffect = ''
        onValue(lastUpdated, (snapshot) => {
             updatedUseEffect = snapshot.val()
        })
        
        if (updatedUseEffect!=Contexto_game.LastUP.updated){
            onValue(partida_ref, (snapshot) => {if (snapshot.val() != partida) setPartida(snapshot.val())})
            onValue(monte, (snapshot) => {if (snapshot.val() != carta_monte) setMonte(snapshot.val())})
            onValue(lixo, (snapshot) => {if (snapshot.val() != carta_lixo) setLixo(snapshot.val())})

            onValue(animation_ref, (snapshot) => {
                let animation = AnimationContext.Animate.animation
                if (snapshot.val() != animation) AnimationContext.Animate.setAnimation(snapshot.val())
            })

            if (updatedUseEffect != Contexto_game.LastUP.updated) Contexto_game.LastUP.setUpdated(updatedUseEffect)
            console.log("Todos os Onvalues")
            console.log(partida)

        }
        
    },[carta_lixo, carta_monte, partida, setLixo, setMonte, setPartida, Contexto_game.LastUP])

    
    
    


    
   
return (
    <div className={styles.mesa}>
        <div className={styles.cartaContainer}>
            <Naipe naipe={1}/>
            
            <Naipe naipe={2}/>
        
            <Naipe naipe={3}/>
        
            <Naipe naipe={4}/>

            
        </div>

        <div className={styles.barra_branca}>  </div>
        
        <div>
            <Monte lixo={carta_lixo} monte={carta_monte}/>
        </div>

        <input type='text' onChange={(e) => HandleChange(e.target.value)} ></input>

    </div>
)

}