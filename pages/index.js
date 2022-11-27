import {  useContext, useState } from 'react'
import {  AnimatePresence } from "framer-motion";
import UserIcon from '../src/componentes/user';

import { GameContext } from "../src/componentes/AppContext";
import Mesa from '../src/componentes/mesa'
import Modal from './../src/componentes/modal'

import { deslogar, logar, verificaSeLogado, CurrentInfo } from '../src/lib/firebase';
import  Router  from 'next/router';

const LogarModal = () => {
  const logado = () => {
    if (typeof(window)==='undefined') {
      clearInterval(refreshIntervalId)
    }
    if (verificaSeLogado()) {
        Router.push('/')
        clearInterval(refreshIntervalId)
    } 

  }
  var refreshIntervalId = setInterval(logado, 500);
  
  
  return (<button onClick={() => logar()}> Logar  </button>)

}


export default function Home() {

    
    const ContextoGame = useContext(GameContext);
    const myPosition = ContextoGame.Jogadores.jogador
    const modalOpen = ContextoGame.modalOpen
    const setModalOpen = ContextoGame.setModalOpen
    const Logado = verificaSeLogado()
    

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const Logar = () => {
    logar()
    
  }

  let styleModal = (modalOpen) ? 'modal':'hidden'
  console.log("Precisa verificar o bug do lixo")


  if (!Logado) return(<LogarModal/>)
  return (
    <>
    <div>
    
    <div className='settings'>
      <UserIcon src={CurrentInfo('photoURL')}  name={CurrentInfo('displayName')} logout={deslogar}/>
    </div>

      <div className='game'>
          <Mesa/>
      </div>

      <div className={styleModal}>
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null} >
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} contexto={ContextoGame} />}
        </AnimatePresence> 
      </div>

      
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