import React from "react";
import Carta from "../carta";
import styles from './styles.module.css'


export default function Coluna (props){
   
    const cartas = props.cartas
return (
    <div className={styles.coluna} >
 
        {cartas.map( valor_carta =>(
                            <>
                                <Carta src={valor_carta}/>
                            
                            </>

                            )
                    )
        }
    
    </div>
)
}