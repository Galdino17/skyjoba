import styles from './styles.module.css'
import { DivAnimated, Button2 } from "./buttons";
import { auth } from '../../lib/firebase';
import { CreateRoom, EnterRoom, ExitRoom } from '../../lib/baralho';
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
    // Preciso mostrar isso aqui só quando eu tiver uma Sala, no Parent Salas
    const Salas = contexto.salas
    const id = auth.currentUser.uid
    const name = auth.currentUser.displayName
    const players = (!contexto.salas[0])? [] : JsonToList(contexto.salas[0].value.players)
    const playersName = players.map(player => player.value)
    const presenteNaSala = players.map(player => player['id']).includes(id)
    

    const setModal = () => {contexto.setModalOpen(false)}
    const EntrarSala = () => {EnterRoom(id, name, contexto.salas[0].id, playersName.length)}
    const SairSala = () => {ExitRoom(id, name, contexto.salas[0].id, presenteNaSala, playersName.indexOf(name))}
    const DistribuirJogadores = () => {DistribuirJogadores(playersName)}
   
    const Play = () => {
        
        return ( <Button2 texto={'Play'} CssNumero={1} onClick={setModal}  /> )
        }
    
    const Entrar = () => {
            // if (presenteNaSala) return(<></>)
            return (<Button2 texto={'Entrar'} CssNumero={1} onClick={EntrarSala}  /> )
            }

    const Sair = () => {
            if (!presenteNaSala) return(<></>)
            return (<Button2 texto={'Sair'} CssNumero={1} onClick={SairSala}  /> )
            }

    const Gerar = () => {
        if (players.length!=3) return(<></>)
        return (<Button2 texto={'Gerar'} CssNumero={1} onClick={DistribuirJogadores}  /> )
        }

    
    if (Salas.length==0) return(<></>)
    return(
        <>
        {Salas.map((sala, index)=>{

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
        }

        <Play/>
        <Gerar/>
        <Entrar/>
        <Sair/>
        
    
    </>
    )
}


export const Salas = ({contexto}) => {

    return (
        <div className={styles.cardGridSpace}>
                <div className={styles.titulo}> Gerenciador de Sala </div>
                <SalasInicio contexto={contexto}/>
                <CriarSala contexto={contexto} />

        </div>
    //   
    )
}