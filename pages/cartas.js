import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'
import { lastUpdated, partida as partida_ref } from "../src/lib/baralho"
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Home() {

    const [partida, setPartida] = useState('vazio')
    const [updatedAt, setUpdated] = useState('vazio')
    useEffect(()=>{

        let updatedUseEffect = ''
        onValue(lastUpdated, (snapshot) => {
            updatedUseEffect = snapshot.val()
       })
        if(updatedUseEffect!=updatedAt){
            onValue(partida_ref, (snapshot) => {if (snapshot.val() != partida) setPartida(snapshot.val())})
            setUpdated(updatedUseEffect)
            console.log(partida)

        }
        

    })

    
    
    return(
        // <button onClick={() => SendCarsToServer('PartidaTeste', LoadCartas())}> Enviar  </button>
        <div> Olhe o Console</div>
    )
    

}