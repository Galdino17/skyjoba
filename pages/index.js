import {  useContext } from 'react'
import {  AnimatePresence } from "framer-motion";
import UserIcon from '../src/componentes/user';


import { GameContext } from "../src/componentes/AppContext";
import Mesa from '../src/componentes/mesa'
import Modal from './../src/componentes/modal'

import {SendCarsToServer} from '../src/lib/baralho'
import { deslogar, logar, verificaSeLogado, CurrentInfo } from '../src/lib/firebase';


const LogarModal = ({Logar}) => {

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