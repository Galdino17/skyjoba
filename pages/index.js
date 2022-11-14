import { useState, useContext } from 'react'

import Mesa from '../src/componentes/mesa'
import {SendCarsToServer, cavar} from '../src/lib/baralho'
import { Provider_Game} from '../src/componentes/AppContext'
import { logar } from '../src/lib/firebase';

let socket;

const Home = () => {
  const [carta, setCava] = useState('vazio')
  
  
  


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
    <Mesa/>
  </Provider_Game>
  
  
       
      
     

      
    </>
  )
}

export default Home;