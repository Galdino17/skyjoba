import { useState, useEffect, useContext } from 'react'

import Mesa from '../src/componentes/mesa'
import {SendCarsToServer, getCartas, LoadCartas, cavar} from '../src/lib/baralho'
import {Provider_jogador} from '../src/componentes/AppContext'
import { getDatabase, ref, set, onValue } from "firebase/database";

let socket;

const Home = () => {
  const [input, setInput] = useState([])
  const [carta, setCava] = useState('vazio')
  
  
  

  useEffect(() => {
    return () => {
      
      
    } 
  });

  const handleCavar = () => {
    setCava(cavar())
  }

  const handleReceber = () => {
    let novasCartas = [getCartas(1), getCartas(2), getCartas(3), getCartas(4)]
    
  }



 


  return (
    <>
  <button onClick={() => SendCarsToServer()}> Enviar  </button>
  <button onClick={() => handleCavar()}> Cavar  </button>
  <button onClick={() => handleReceber()}> Receber  </button>
  <Provider_jogador>
    <Mesa/>
  </Provider_jogador>
  
  
       
      
     

      
    </>
  )
}

export default Home;