import React, {useContext, useState} from "react";

import styles from './styles.module.css'
import Coluna from "../coluna";

import { getAuth } from "firebase/auth";
import { JogadorContext } from "../AppContext";
import { onValue, ref } from "firebase/database";
import { database } from "../../lib/baralho"



export default  function Naipe (props){
    const auth = getAuth()

    const jogadorContext = useContext(JogadorContext);
    const player = jogadorContext.jogador
    
    const [jogador_atual, setAtual] = useState(0)
    const [placar_atual, setPlacar] = useState(0)
    const [placar_geral, setPlacarGeral] = useState(0)
    const [nome, setNome] = useState('nome_aquii')

    const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
    onValue(jogador_db, (snapshot) => {
            let jogadorAtual = snapshot.val();
            if (jogadorAtual != jogador_atual) setAtual(parseInt(jogadorAtual));
            
            } );

    const nome_db = ref(database, '/PartidaTeste/jogadores/'+props.naipe+'/nome')
    onValue(nome_db, (snapshot) => {
            if (!auth) return null
            let nome = snapshot.val();
            //console.log(auth.currentUser.displayName)
            //if (nome != auth.currentUser.displayName) setNome(nome);
            
            } );
    
    const placar_db = ref(database, '/PartidaTeste/jogadores/'+props.naipe+'/placar_atual')
    onValue(placar_db, (snapshot) => {

            let placar = snapshot.val();
            if (placar != placar_atual) setPlacar(placar);
            
            } );
    
    const placar_geral_db = ref(database, '/PartidaTeste/jogadores/'+props.naipe+'/placar_total')
    onValue(placar_geral_db, (snapshot) => {
            let placar = snapshot.val();
            if (placar != placar_geral) setPlacarGeral(placar);
            
            } );

            
    // let titulo = (player==props.jogador) ? styles.titulo : styles.titulo_atual
    let titulo = (player==props.naipe) ? styles.titulo : styles.titulo_atual
    let placar = (jogador_atual==props.naipe) ? styles.placar : `${styles.placar} ${styles.placar_atual}`
    let cartas = [...Array(4)]

return (
    <div className={styles.naipe} >
        <div className={titulo}> Jogador {props.naipe} </div>

        <div className={styles.cartas_tab}>    
            {cartas.map(( (cartas_coluna, index) =>(
                                <>
                                    <div key={index}>
                                        <Coluna naipe={props.naipe} coluna={index} atual={jogador_atual} player={player}/>
                                    </div>
                                </>

                                )
                        ))
            }
        </div>
        <div className={placar}>
            <div>Placar Parcial {placar_atual} </div>
            <div>Placar Total {placar_geral} </div>
        </div>
    </div>
)
}