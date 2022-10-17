import React from "react";
import Image from 'next/image'
import styles from '../../../styles/cartas.module.css'

const WithDynamicImage = (props) => {
    
    return (
        <Image src={props.src}
          alt={props.src}
          className={'image'}
          layout='fill'
          objectFit="cover"
          
        />
    )
    
    }

export default function ImageC(props) {
    
    return(
        <WithDynamicImage src={props.src}/>
    )

}

    
    