export const dropIn = {
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