import Naipe from '../naipe'
import Monte from '../monte'
import styles from './styles.module.css'
import { getMonte } from "../../lib/baralho";
import { useEffect, useState } from 'react';

export default  function Mesa(props) {
    const [lixo, setLixo] = useState('vazio')
    const [monte, setMonte] = useState('vazio')
    useEffect(() => {
        const callData = async () => {
            
            const data = await getMonte().then(data => data)
            setMonte(data[0])
            setLixo(data[1])
            
      
          }

          callData()
      }, []);
    
   
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
            <Monte lixo={lixo} monte={monte}/>
        </div>

    </div>
)

}