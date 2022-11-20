import styles from './styles.module.css'
import { DivAnimated, Button2 } from "./buttons";
import { auth } from '../../lib/firebase';
import { CreateRoom, EnterRoom } from '../../lib/baralho';
import { JsonToList } from '../../lib/functions';


const CriarSala = ({contexto}) => {
    const id = auth.currentUser.uid
    const name = auth.currentUser.displayName
    const onClick = () => (CreateRoom(id, name))
    
    if (contexto.qtdSala>0) return (<></>) 
    return (
        <>  
            <Button2 texto={'Criar Sala'} CssNumero={3} onClick={onClick}  />
        </>
    )
}

const SalasInicio = ({contexto}) => {
    const Salas = contexto.salas
    
    
    return(
        Salas.map((sala, index)=>{
            return(
                <>
                    <DivAnimated key={sala.id} texto={"Sala Ativa"} CssNumero={2}  spans={0} styleAdicional={styles.divAnimated}/>
                        {
                            JsonToList(sala.value.players).map(( player, index) => (
                                <DivAnimated key={index} texto={player.value} CssNumero={10-index}  spans={1} styleAdicional={styles.divAnimated}/>
                            ))
                        }
                </>

            )
    })
    )
}


export const Salas = ({contexto}) => {
    const id = auth.currentUser.uid
    const name = auth.currentUser.displayName

    const setModal = () => {contexto.setModalOpen(false)}
    const EntrarSala = () => {EnterRoom(id, name, contexto.salas[0].id)}
   

    const Play = () => (
        <div className={styles.buttons}>
                    <Button2 texto={'Play'} CssNumero={1} onClick={setModal}  />
                 </div>
    )

    const Entrar = () => (
        <div className={styles.buttons}>
                    <Button2 texto={'Entrar'} CssNumero={1} onClick={EntrarSala}  />
                 </div>
    )
    

    return (
        <div className={styles.cardGridSpace}>
                <div className={styles.titulo}> Gerenciador de Sala </div>
                <SalasInicio contexto={contexto}/>
                <CriarSala contexto={contexto} />

                <Play/>
                <Entrar/>
        </div>
    //   
    )
}