import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'
import { SendCarsToServer, LoadCartas } from "../src/lib/baralho"

export default function Home() {
    return(
        <button onClick={() => SendCarsToServer('PartidaTeste', LoadCartas())}> Enviar  </button>
    )
    

}