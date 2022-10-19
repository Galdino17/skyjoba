import { useState, useEffect } from 'react'

import Mesa from '../src/componentes/mesa'
import {SendCarsToServer, GetCarsToServer, LoadCartas} from '../src/lib/baralho'
import { getDatabase, ref, set, onValue } from "firebase/database";

let socket;

const Home = () => {
  const [input, setInput] = useState([])

  useEffect(() => {
    return () => {
      const database = getDatabase();
        const starCountRef = ref(database, '/');
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          //setInput([...data])
          console.log(data)
          
        });
        console.log("jk")
      
    } 
  });

  

 


  return (
    <>
  <button onClick={() => SendCarsToServer(LoadCartas())}> Enviar  </button>
  <button onClick={() => GetCarsToServer()}> Receber  </button>
  <Mesa/>
  <h1> {input.length} </h1>
       
      
     

      
    </>
  )
}

export default Home;