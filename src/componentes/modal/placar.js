import styles from './styles.module.css'
import { DivAnimated, Button2 } from "./buttons";
import { compareMatriz } from '../../lib/functions';

export const Placar = ({contexto}) => {

    const jogadores = contexto.partida.infoPartida.jogadores

    const placarString = jogadores.map((jogador, index) => {
        
        return (
            {'jogador': index, 'placar':jogador.placares.slice(1).join('+'), 'total':jogador.placar_total}

            )
    })

    const placarTotal = placarString.sort( compareMatriz )
    
    //const placarString = placares.map(placar => (placar.join(' + ')))
    
    const setModal = () => {contexto.setModalOpen(false)}


    return (
        <div className={styles.cardGridSpace}>
                <div className={styles.titulo}> Placar Atual </div>
                {
                  placarTotal.map( (jogador, index) => (
                    <div key={jogador['jogador']} > 
                    <DivAnimated texto={'Jogador' +jogador['jogador']+': '+jogador['placar']+' = '+jogador['total']} CssNumero={4-index}  spans={2} styleAdicional={styles.divAnimated}/>
                    </div>
                  
                 )
                 )}

                <div className={styles.buttons}>
                    <Button2 texto={'Fechar Placar'} CssNumero={1} onClick={setModal}  />

                 </div>
        </div>
    //   
    )
}