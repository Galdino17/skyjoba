import { createContext, useRef } from "react";
import { useState } from "react";
import { onValue } from "firebase/database";
import { root, SalasInicio, getCreatedRoom, setCreatedRoom } from "../../lib/baralho";

export const PlacarContext = createContext();
export const JogadorContext = createContext();
export const LocationContext = createContext();
export const GameContext = createContext();




export const Provider_Game = ({ children }) => {
  const [updated, setUpdated] = useState('')
  const [infoPartida, setInfoPartida] = useState('')
  const [salas, setSalas] = useState('')
  const [qtdSala, setQtdSala] = useState(0)
  const [SalaCriada, setSalaCriada] = useState(false)
  const [SalaAtiva, setSalaAtiva] = useState('')


  const jogadorQueBateu = useRef(0)
  const [jogador, setJogador] = useState(1)
  const [atual, setAtual] = useState(1)
  const [modalOpen, setModalOpen] = useState(false);
  
  onValue(root, (snapshot) => {
    let rootVal = snapshot.val()
    if (rootVal.salaAtiva=="" && SalaCriada){
          setSalaCriada(false)
          setCreatedRoom('')
          setSalaAtiva('')
    } else if (SalaCriada){
      
      if (rootVal.salas[SalaAtiva].Partida.lastUpdated != updated) {
            setUpdated(rootVal.salas[SalaAtiva].Partida.lastUpdated)
            setInfoPartida(rootVal.salas[SalaAtiva].Partida) 
          } 
      
      if (SalasInicio(rootVal.salas).length != qtdSala) {
            let salas = SalasInicio(rootVal.salas)
            setQtdSala(salas.length)
            setSalas(salas)
          }
    } else {
      if (rootVal.salaAtiva!='') {
          setSalaCriada(true)
          setCreatedRoom(rootVal.salaAtiva)
          setSalaAtiva(rootVal.salaAtiva)
      }
      
    }   
      })
  
  return <GameContext.Provider value={{ partida:{infoPartida, setInfoPartida}, locais:{}, Jogadores: { jogador, setJogador, atual, setAtual, jogadorQueBateu}, modalOpen, setModalOpen, salas, setSalas, qtdSala }}>{children}</GameContext.Provider>;
};

// Status Global
// Selecionar cartas - inicio
// Jogo normal - mid
// Ultima jogada de cada
// Reiniciando