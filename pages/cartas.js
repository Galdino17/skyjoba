import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'

export default function Home() {
    const array = [...Array(12)]
return (
    <div className={styles.cartaContainer}>
        <Naipe array={array}/>
        
        <Naipe array={array}/>
      
        <Naipe array={array}/>
       
        <Naipe array={array}/>
    </div>
)

}