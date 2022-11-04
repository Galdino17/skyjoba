import { createContext } from "react";
import { useState } from "react";
import { onValue } from "firebase/database";
import { verifica_placar_atual, set_placar, partida } from "../../lib/baralho";

export const PlacarContext = createContext();
export const JogadorContext = createContext();
export const LocationContext = createContext();
export const GameContext = createContext();


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

export const Provider_Game = ({ children }) => {
  const [updated, setUpdated] = useState(1)
  const [infoPartida, setInfoPartida] = useState('')
  onValue(partida, (snapshot) => {
    if (snapshot.val().lastUpdated != updated) {

        setUpdated(snapshot.val().lastUpdated)
        setInfoPartida(snapshot.val())
        
        for (let index = 0; index < snapshot.val().jogadores.length; index++) {
          const jogador =  snapshot.val().jogadores[index];
          
          let placar_atual = verifica_placar_atual(jogador)
          let placar_online = jogador.placar_atual
          if (placar_atual!=placar_online) set_placar(index, placar_atual)
          
        }

        
      
    
  } })
  
  return <GameContext.Provider value={{ LastUP:{updated, setUpdated}, partida:{infoPartida, setInfoPartida} }}>{children}</GameContext.Provider>;
};

;