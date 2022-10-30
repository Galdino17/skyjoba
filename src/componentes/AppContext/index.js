import { createContext } from "react";
import { useState } from "react";

export const PlacarContext = createContext();
export const JogadorContext = createContext();
export const LocationContext = createContext();


export const Provider_jogador = ({ children }) => {
    const [jogador, setJogador] = useState(1)
    const [atual, setAtual] = useState(1)
    return <JogadorContext.Provider value={{ jogador, setJogador, Atual:{atual, setAtual} }}>{children}</JogadorContext.Provider>;
  };

export const Provider_Location = ({ children }) => {
    const [lixo, setLixo] = useState(1)
    const [mao, setMao] = useState(1)
    const [animation, setAnimation] = useState('')
    return <LocationContext.Provider value={{ Mao:{mao, setMao}, Lixo:{lixo, setLixo}, Animate:{animation, setAnimation} }}>{children}</LocationContext.Provider>;
  };

;