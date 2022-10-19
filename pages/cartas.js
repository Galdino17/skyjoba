import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'
import { getCartas } from "../src/lib/baralho"

export default function Home() {
    const array_1 = getCartas()
    const array_2 = getCartas()
    const array_3 = getCartas()
    const array_4 = getCartas()
    console.log(array_1)
return (
    <div className={styles.cartaContainer}>
        <Naipe cartas={array_1} jogador={1}/>
        
        <Naipe cartas={array_2}  jogador={2}/>
      
        <Naipe cartas={array_3}  jogador={3}/>
       
        <Naipe cartas={array_4} jogador={4}/>
    </div>
)

}