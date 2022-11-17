import { motion } from "framer-motion";
import styles from './styles.module.css'

const Backdrop = ({ children, onClick }) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0, width:'0%' }}
      animate={{ opacity: 1, width:'100%' }}
      exit={{ opacity: 0, width:'0%' }}
    >
      {children}
    </motion.div>
  );
};

const dropIn = {
    hidden: {
      y: "-100vh",
      width: '0%',
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      width: '100%',
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      width: '0%',
      opacity: 0,
    },
  };

const Placar = ({contexto}) => {

    const jogadores = contexto.partida.infoPartida.jogadores

    const placarString = jogadores.map((jogador, index) => (
      
         jogador.placares.slice(1).join('+')
      
         ))
    const placarTotal = jogadores.map((jogador, index) => (
      jogador.placar_total
    ))
    //const placarString = placares.map(placar => (placar.join(' + ')))
    


    return (
        <div className={styles.cardGridSpace}>
                {
                  placarString.map( (placar, index) => (
                  <div key={index} className={styles.linhaPlacar}> Jogador {index}: {placar} = {placarTotal[index]}
                          
                  </div>
                 )
                 )}
        </div>
    //   
    )
}

const Modal = ({ handleClose, contexto }) => {
    
    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Placar contexto={contexto} />
            <button onClick={handleClose}>Close</button>
          </motion.div>
      </Backdrop>
    );
  };

  

export default Modal;