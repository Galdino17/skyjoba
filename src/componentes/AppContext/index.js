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
    if (snapshot.val().salaAtiva=="" && SalaCriada){
          setSalaCriada(false)
          setCreatedRoom('')
          setSalaAtiva('')
    } else if (SalaCriada){
      
      if (snapshot.val().salas[SalaAtiva].Partida.lastUpdated != updated) {
            setUpdated(snapshot.val().salas[SalaAtiva].Partida.lastUpdated)
            setInfoPartida(snapshot.val().salas[SalaAtiva].Partida) 
          } 
      
      if (SalasInicio(snapshot.val().salas).length != qtdSala) {
            let salas = SalasInicio(snapshot.val().salas)
            setQtdSala(salas.length)
            setSalas(salas)
          }
    } else {
      if (snapshot.val().salaAtiva!='') {
          setSalaCriada(true)
          setCreatedRoom(snapshot.val().salaAtiva)
          setSalaAtiva(snapshot.val().salaAtiva)
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