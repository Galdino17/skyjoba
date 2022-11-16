import { createContext, useRef } from "react";
import { useState } from "react";
import { onValue } from "firebase/database";
import { partida } from "../../lib/baralho";

export const PlacarContext = createContext();
export const JogadorContext = createContext();
export const LocationContext = createContext();
export const GameContext = createContext();




export const Provider_Game = ({ children }) => {
  const [updated, setUpdated] = useState('')
  const [infoPartida, setInfoPartida] = useState('')


  const jogadorQueBateu = useRef(0)
  const [jogador, setJogador] = useState(1)
  const [atual, setAtual] = useState(1)
  
  onValue(partida, (snapshot) => {
    if (snapshot.val().lastUpdated != updated) {
        
          setUpdated(snapshot.val().lastUpdated)
          setInfoPartida(snapshot.val()) 
          

  } })
  
  return <GameContext.Provider value={{ partida:{infoPartida, setInfoPartida}, locais:{}, Jogadores: { jogador, setJogador, atual, setAtual, jogadorQueBateu} }}>{children}</GameContext.Provider>;
};

// Status Global
// Selecionar cartas - inicio
// Jogo normal - mid
// Ultima jogada de cada
// Reiniciando