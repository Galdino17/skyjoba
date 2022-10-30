import React, { useState, useContext, useRef, useEffect, useCallback } from "react"
import { motion, Variants } from "framer-motion"
import { LocationContext, JogadorContext } from '../AppContext';

import styles from './styles.module.css'


export default function AnimationDiv ({children, id}){
    const Lixo = useContext(LocationContext).Lixo 
    const Mao = useContext(LocationContext).Mao 
    const Animate = useContext(LocationContext).Animate 
    const inputRef = useRef();
    const [clicked, setClicked] = useState(false)
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

    const move_lixo = () => {
        //Essa função só rodará na carta lixo

    }

    const move = useCallback((de, para) => {
        if (id!='mao' && id!='lixo' && id!='monte'){

            setClicked(!clicked)
            setAnimated(Animate.animation)
            

            moveX(de, para)
            moveY(de, para)

        }
        
    }, [])

    useEffect(() => {

        if (id=='lixo') Lixo.setLixo(x_y())
        if (id=='mao') Mao.setMao(x_y())
        if (Animate.animation.slice(2,7)==id && Animate.animation!=animated ) move(x_y(), Lixo.lixo)
        //Se for igual a l, foi cavada do lixo 
        if (Animate.animation.slice(0,1)=='l' && Animate.animation!=animated ) move_lixo()
        
        
    }, [Lixo.setLixo, Mao.setMao, id, move, Animate.animation, animated, Mao, Lixo])
    

    const variants = {
        move: { x:xmoved, y:ymoved, transition: { duration: 0.5 } },
        move_back: { x:xmoved_, y:ymoved_, transition: { delay:  0.5, duration: 0.0005  }},
        // crescer: { scale:[1,1.2]  , transition: { duration: 0.5 } },
        // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
        stop: { x:xmoved, y:ymoved, transition: { duration: 0.005 } }
      };


    
    

    return (
        <motion.div ref={inputRef} variants={variants}
         
         animate={clicked ? 'move' : 'stop'}
        >
        <motion.div variants={variants}
         animate={clicked ? 'move_back' : 'stop'}
         onClick={(e) => move()}
        >
            {children}

        </motion.div>

            
        
            
            
        </motion.div>
       
    )
}
