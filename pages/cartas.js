import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'
import { teste, lastUpdated, partida as partida_ref } from "../src/lib/baralho"
import { onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Home() {

    const [partida, setPartida] = useState('vazio')
    const [updatedAt, setUpdated] = useState('vazio')
    const [Teste, setTeste] = useState('vazio')
    useEffect(()=>{

        let updatedUseEffect = ''
        onValue(lastUpdated, (snapshot) => {
            updatedUseEffect = snapshot.val()

       })
       
        if(updatedUseEffect!=updatedAt || Teste=='vazio'){
            onValue(teste, (snapshot) => {
                if (snapshot.val() != Teste) setTeste(snapshot.val())
                console.log('--')
                console.log(snapshot)
                console.log('--')
            })
            setUpdated(updatedUseEffect)
            console.log(JSON.stringify(Teste) )
            console.log("Updated At: "+updatedUseEffect)

        }
        

    })

    
    
    return(
        // <button onClick={() => SendCarsToServer('PartidaTeste', LoadCartas())}> Enviar  </button>
        <div> Olhe o Console</div>
    )
    

}