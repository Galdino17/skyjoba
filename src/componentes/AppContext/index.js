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

  const [animation, setAnimation] = useState('')
  const [animando, setAnimando] = useState(false)
  const [atualiza, setAtualiza] = useState(true)

  const [jogador, setJogador] = useState(1)
  const [atual, setAtual] = useState(1)
  
  onValue(partida, (snapshot) => {
    if (snapshot.val().lastUpdated != updated) {
        if (atualiza) {
          setUpdated(snapshot.val().lastUpdated)
          setInfoPartida(snapshot.val()) 
          setAtualiza(false)

        }
         
    
  } })
  
  return <GameContext.Provider value={{ partida:{infoPartida, setInfoPartida}, animate:{animation, setAnimation}, locais:{}, stautsGlobal:{}, animando, setAnimando, setAtualiza, Jogadores: { jogador, setJogador, atual, setAtual}  }}>{children}</GameContext.Provider>;
};

// Status Global
// Selecionar cartas - inicio
// Jogo normal - mid
// Ultima jogada de cada
// Reiniciando