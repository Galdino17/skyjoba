import { motion } from "framer-motion";
import styles from './styles.module.css'

const Backdrop = ({ children, onClick }) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

const Placar = () => {
    return (
        <div className={styles.cardGridSpace}>
                <div>
                    <div className={styles.linhaPlacar}>Jogador 1: 5 + 6 + 10 = 21</div>
                    <div className={styles.linhaPlacar}>Jogador 1: 5 + 6 + 10 = 21</div>
                    <div className={styles.linhaPlacar}>Jogador 1: 5 + 6 + 10 = 21</div>
                    <div className={styles.linhaPlacar}>Jogador 1: 5 + 6 + 10 = 21</div>
                </div> 
        </div>
    //   
    )
}

const Modal = ({ handleClose }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p> <Placar/></p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
      </Backdrop>
    );
  };

  

export default Modal;