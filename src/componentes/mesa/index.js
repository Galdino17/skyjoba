import Naipe from '../naipe'
import styles from './styles.module.css'
import { getCartas } from "../../lib/baralho"

export default function Mesa() {
    const array_1 = getCartas()
    const array_2 = getCartas()
    const array_3 = getCartas()
    const array_4 = getCartas()
return (
    <div className={styles.cartaContainer}>
        <Naipe cartas={array_1} jogador={1}/>
        
        <Naipe cartas={array_2}  jogador={2}/>
      
        <Naipe cartas={array_3}  jogador={3}/>
       
        <Naipe cartas={array_4} jogador={4}/>
    </div>
)

}