import { useState, useContext } from 'react'
import {  AnimatePresence } from "framer-motion";


import { GameContext } from "../src/componentes/AppContext";
import Mesa from '../src/componentes/mesa'
import Modal from './../src/componentes/modal'

import {SendCarsToServer} from '../src/lib/baralho'
import { logar } from '../src/lib/firebase';




export default function Home() {

    
    const ContextoGame = useContext(GameContext);
    const modalOpen = ContextoGame.modalOpen
    const setModalOpen = ContextoGame.setModalOpen


  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const Logar = () => {
    logar()
    
  }

  let styleModal = (modalOpen) ? 'modal':'hidden'

  return (
    <>
    
    <div>

    

    <div className='game'>
          <Mesa/>
      </div>

      <div className={styleModal}>
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null} >
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} contexto={ContextoGame} />}
        </AnimatePresence> 
      </div>

      

      

      

      <button onClick={() => SendCarsToServer()}> Enviar  </button>
      <button onClick={() => Logar()}> Logar  </button>
      <button  onClick={() => (modalOpen ? close() : open())}> Launch  </button> 
    </div>

     

    </>
  )
    
  
  
}


// const Home = () => {
//   const [carta, setCava] = useState('vazio')
  
  
  


//   const handleCavar = () => {
//     setCava(cavar())
//   }



 


//   return (
//     <>
  
  
  
       
      
     

      
//     </>
//   )
// }

// export default Home;