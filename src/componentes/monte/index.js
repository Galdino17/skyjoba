import styles from './styles.module.css'
import {Frente, Verso} from '../carta'
import { useState } from 'react'

export default function Monte(props) {
const [carta, setCarta] = useState('vazio')
    
return (
    <div className={styles.monte}>
        
        <div className={styles.cartaContainer} onClick={() => setCarta(props.monte)}>
        
            <div className={styles.carta}>
                <Verso />
            </div>
            <div className={styles.titulo}> Monte </div>
        </div>

        <div className={styles.cartaContainer}>
        
            <div className={styles.carta}>
                <Frente src={carta}/>
            </div>
            <div className={styles.titulo}> Mao </div>
        </div>

        <div className={styles.cartaContainer} onClick={() =>   setCarta(props.lixo)} >
        
            <div className={styles.carta}>
                <Frente src={props.lixo}/>
            </div>
            <div className={styles.titulo}> Lixo </div>
        </div>
        
    </div>

        

    
)

}