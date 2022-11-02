import { useState, useEffect, useContext } from 'react'

import Mesa from '../src/componentes/mesa'
import {SendCarsToServer, cavar} from '../src/lib/baralho'
import {Provider_jogador, Provider_Location, Provider_Game} from '../src/componentes/AppContext'
import { logar } from '../src/lib/firebase';

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

  const Logar = () => {
    logar()
    
  }



 


  return (
    <>
  <button onClick={() => SendCarsToServer()}> Enviar  </button>
  <button onClick={() => handleCavar()}> Cavar  </button>
  <button onClick={() => Logar()}> Logar  </button>
  <Provider_Game>
  <Provider_Location>
  <Provider_jogador>
    <Mesa/>
  </Provider_jogador>
  </Provider_Location>
  </Provider_Game>
  
  
       
      
     

      
    </>
  )
}

export default Home;