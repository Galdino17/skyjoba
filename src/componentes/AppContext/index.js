import { createContext } from "react";
import { useState } from "react";

const PlacarContext = createContext();
export const JogadorContext = createContext();

export const Provider_jogador = ({ children }) => {
    const [jogador, setJogador] = useState(1)
    return <JogadorContext.Provider value={{ jogador, setJogador }}>{children}</JogadorContext.Provider>;
  };

export default PlacarContext;