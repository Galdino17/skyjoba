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
          
          
        });
      
    } 
  });

  

 


  return (
    <>
  <button onClick={() => SendCarsToServer('PartidaTeste', LoadCartas())}> Enviar  </button>
  <button onClick={() => GetCarsToServer()}> Receber  </button>
  <Mesa/>
       
      
     

      
    </>
  )
}

export default Home;