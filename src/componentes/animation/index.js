import React, { useContext, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { GameContext } from '../AppContext';
import { move } from "./functions";




export default function AnimationDiv ({children, id}){
    // const Game = useContext(GameContext)
    

    // const animate = Game.animate.animation
    // const setAnimate = Game.animate.setAnimation
    // const setAnimando = Game.setAnimando
    // const setAtualiza = Game.setAtualiza
    
    // const xmoved = useRef();
    // const ymoved = useRef();
    // const _xmoved = useRef();
    // const _ymoved = useRef();
    // const inputRef = useRef();
    // const animacao = useRef();
    // const animando = Game.animando


    

    // useEffect(()=>{

    //     const x = inputRef.current.getBoundingClientRect().x
    //     const y = inputRef.current.getBoundingClientRect().y
    //     Game.locais[id] = {x:x, y:y}

    // })


    // const limpa_animacao = () => {
    //     setAnimate('')
    //     setAnimando(false)
    //     console.log("Limpado a animacao")
        
    // }

    // const changeImage = () => {
    //     console.log("Mudado")
    //     setAtualiza(true)
        
    // }

    // const mover = (de, para) => {
    //     setAnimando(true)
    //     let movimentos = move(Game.locais, de, para)
    //     ymoved.current = movimentos['y'][0]
    //     xmoved.current = movimentos['x'][0]
    //     _ymoved.current = movimentos['y'][1]
    //     _xmoved.current = movimentos['x'][1]
    //     animacao.current = 'move'


    // }

    // // let animateSub = animate.substring(1,9)  
    // // if (animate.includes('c')){
        
    // //     if (id=='mao') mover(animateSub, 'mao')
    // //     if (animateSub==id && false) {
    // //         mover('lixo', animateSub )
    // //         delay = 0.5
    // //     }
            

    // // }

    //  if (id=='mao'){
    //      if (animate=='lixo-to-mao')  {mover('lixo', id)}
    // }



    // const variants = {
    //     move: {  x:[xmoved.current, _xmoved.current], y:[ymoved.current, _ymoved.current] },
    //     crescer: { scale:[1,1.2,1]  , transition: { duration: 0.8 } },
    //   };


    
    

    return (
        <>
        {children}
        </>
      
            // <motion.div variants={variants} ref={inputRef}
            //     onAnimationComplete={() => limpa_animacao()} 
            //     onAnimationStart={() => changeImage() }
            //     animate={animacao.current!='' ? animacao.current : 'stop'}
            // >
            //     {children}

            // </motion.div>
       
    )
}