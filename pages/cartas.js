import Naipe from "../src/componentes/naipe"
import styles from '../styles/cartas.module.css'
import { teste, lastUpdated, get_firebase, get_firebase_by_vercel, Teste_todos } from "../src/lib/baralho"
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
            get_firebase('PartidaTeste/Teste/valoo').then(retorno => {
                console.log("Promisse get Firebase")
                console.log(retorno)
                console.log("Jsoned")
                console.log(JSON.stringify(retorno) )
                console.log("Finished  get Firebase")
            })

            get_firebase_by_vercel('PartidaTeste/Teste').then(retorno => {
                console.log("Promisse get Firebase by vercel")
                console.log(retorno)
                console.log("Jsoned")
                console.log(JSON.stringify(retorno) )
                console.log("Finished get Firebase by vercel")
            })

            console.log(Teste_todos().then(retorno=>{
                console.log("kk")
                console.log(retorno.val())
                console.log("ksk")

            }))
            setUpdated(updatedUseEffect)


        }
        

    })

    
    
    return(
        // <button onClick={() => SendCarsToServer('PartidaTeste', LoadCartas())}> Enviar  </button>
        <div> Olhe o Console</div>
    )
    

}