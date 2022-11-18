import {motion} from 'framer-motion'

export const Backdrop = ({ children, onClick }) => {
 
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