import React, { useState, useContext, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { LocationContext } from '../AppContext';




export default function AnimationDiv ({children, id}){
    const Lixo = useContext(LocationContext).Lixo 
    const Mao = useContext(LocationContext).Mao 
    const Animate = useContext(LocationContext).Animate 
    const inputRef = useRef();

    const [animated, setAnimated] = useState('')
    const [xmoved, setXmoved] = useState('0')
    const [ymoved, setYmoved] = useState('0')
    const [xmoved_, setXmoved_] = useState('0')
    const [ymoved_, setYmoved_] = useState('0')
 

    const x_y = () => {
        const x = inputRef.current.getBoundingClientRect().x
        const y = inputRef.current.getBoundingClientRect().y
        return {x:x, y:y}
    }

    



    const distancia = (de, para, eixo) => {
        let distancia = para[eixo] - de[eixo] 
        let real_distancia = (distancia/Math.abs(distancia))*Math.abs(distancia)
        return real_distancia

    }

    
    
    const moveX = (de, para) => {        
        let real_distancia = distancia(de, para, 'x') 
        setXmoved(real_distancia+'px')
        setXmoved_(-real_distancia+'px')
        
    }

    const moveY = (de, para) => {       
        let real_distancia = distancia(de, para, 'y') 
        setYmoved(real_distancia+'px')
        setYmoved_(-real_distancia+'px')
    }

    const move_to_lixo = () => {
        //Essa função só rodará na carta lixo

    }

    const move_de_mao = (id_move) => {

        //Essa função só rodará na carta mao
        if(id=='mao'){
            move(id_move)
        }

    }

    const move = (para) => {

            
            // setAnimated(Animate.animation)
            // let de = x_y()

            // moveX(de, para)
            // moveY(de, para)

        
        
    }
    
    const variants = {
        move: { x:xmoved, y:ymoved, transition: { duration: 0.5 } },
        move_back: { x:xmoved_, y:ymoved_, transition: { delay:  0.5, duration: 0.0005  }},
        // crescer: { scale:[1,1.2]  , transition: { duration: 0.5 } },
        // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
        stop: { x:xmoved, y:ymoved, transition: { duration: 0.005 } }
      };


    
    

    return (
        <motion.div ref={inputRef} variants={variants}
         
         animate={Animate.animation!=animated ? 'move' : 'stop'}
        >
            <motion.div variants={variants}
            animate={Animate.animation!=animated ? 'move_back' : 'stop'}
            
            >
                {children}

            </motion.div>
        </motion.div>
       
    )
}