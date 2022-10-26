import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useState } from 'react'
import { onValue, ref } from "firebase/database";
import { database, set_mao } from "../../lib/baralho"

export default function Monte(props) {
const [carta, setCarta] = useState('vazio')


const handleClick = (carta) => {
    setCarta(carta)
    set_mao(carta)


}

const mao_db = ref(database, '/PartidaTeste/mao')
    onValue(mao_db, (snapshot) => {

            let mao = snapshot.val();
            if (mao != carta) setCarta(mao);
            
            } );
    
return (
    <div className={styles.monte}>
        
        <div className={styles.cartaContainer} onClick={() => handleClick(props.monte)}>
        
            <div className={styles.carta}>
                <Frente />
            </div>
            <div className={styles.titulo}> Monte </div>
        </div>

        <div className={styles.cartaContainer}>
        
            <div className={styles.carta}>
                <Verso src={carta}/>
            </div>
            <div className={styles.titulo}> Mão </div>
        </div>

        <div className={styles.cartaContainer} onClick={() => handleClick(props.lixo)} >
        
            <div className={styles.carta}>
                <Verso src={props.lixo}/>
            </div>
            <div className={styles.titulo}> Lixo </div>
        </div>
        
    </div>

        

    
)

}