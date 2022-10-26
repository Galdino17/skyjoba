import { useState, useContext } from 'react';

import Naipe from '../naipe'
import Monte from '../monte'
import styles from './styles.module.css'


import { onValue} from "firebase/database";
import {  monte, lixo } from "../../lib/baralho";
import { JogadorContext } from "../AppContext";


export default  function Mesa(props) {
    const jogadorContext = useContext(JogadorContext);
    const [carta_lixo, setLixo] = useState('vazio')
    const [carta_monte, setMonte] = useState('vazio')

    const HandleChange = (valor) => {
        console.log(parseInt(valor))
        jogadorContext.setJogador(parseInt(valor))
        
      }

    onValue(monte, (snapshot) => {
        const data = snapshot.val();
        if (data != carta_monte) setMonte(data);
        });

    onValue(lixo, (snapshot) => {
            const data = snapshot.val();
            if (data != carta_lixo) setLixo(data);
            
            });

    // useEffect(() => {
    //     const callData = async () => {
            
    //         const data = await getMonte().then(data => data)
    //         // setMonte(data[0])
    //         setLixo(data[1])
            
      
    //       }

    //       callData()
    //   }, []);
    
   
return (
    <div className={styles.mesa}>
        <div className={styles.cartaContainer}>
            <Naipe jogador={1}/>
            
            <Naipe jogador={2}/>
        
            <Naipe jogador={3}/>
        
            <Naipe jogador={4}/>

            
        </div>

        <div className={styles.barra_branca}>  </div>
        
        <div>
            <Monte lixo={carta_lixo} monte={carta_monte}/>
        </div>

        <input type='text' onChange={(e) => HandleChange(e.target.value)}></input>

    </div>
)

}