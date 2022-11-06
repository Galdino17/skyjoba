import {  useContext, useState, useEffect } from 'react';


import Naipe from '../naipe'
import Monte from '../monte'
import styles from './styles.module.css'

import { GameContext } from "../AppContext";


export default  function Mesa(props) {
    const ContextoGame = useContext(GameContext);
    const [jogadores, setJogadores] = useState([])
    console.log("Renderizou")

    useEffect(() => {
        if (!!ContextoGame.partida.infoPartida.jogadores) {
            setJogadores([...ContextoGame.partida.infoPartida.jogadores])
            
        }
    }
    , [ContextoGame])

    

 
return (
    <div className={styles.mesa}>
        <div className={styles.cartaContainer}>
            {
                jogadores.map((infoNaipe, index) => {
                    return (<Naipe key={index} naipe={index} infoNaipe={infoNaipe}/>)

                })
            }

            
            
            
        </div>

        <div className={styles.barra_branca}>  </div>
        
        <div>
            <Monte />
        </div>

        <input type='text' defaultValue={ContextoGame.LastUP.updated} ></input>

    </div>
)

}