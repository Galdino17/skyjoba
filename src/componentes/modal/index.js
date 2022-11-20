import { motion } from "framer-motion";
import { Backdrop } from "./backdrop";
import { dropIn } from "./settings";
import { Placar } from "./placar";
import { Salas } from "./salas";




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
            {/* <Placar contexto={contexto} /> */}
            <Salas  contexto={contexto} />
          </motion.div>
      </Backdrop>
    );
  };

  

export default Modal;