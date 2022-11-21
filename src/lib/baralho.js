
import { db, app } from "./firebase";
import { getDatabase, ref, set, push, update, get, child } from "firebase/database";
import { JsonToList, soma_array } from "./functions";


/* 
========================
      Exportações de variaveis
========================
*/
// Atualizar todas essas export const com valor da nova Sala
export const database = getDatabase();
export const root = ref(database, '/');
export var IdSalaCriada = 'Teste'

// const salaAtiva = ref(database, '/salas/'+IdSalaCriada+'/Partida/monte');
// const monte = ref(database, '/salas/'+IdSalaCriada+'/Partida/monte');
// const lixo = ref(database, '/salas/'+IdSalaCriada+'/Partida/lixo');
// const animation = ref(database, '/salas/'+IdSalaCriada+'/Partida/lastAnimation')

// const partida = ref(database, '/salas/'+IdSalaCriada+'/Partida');
// const lastUpdated = ref(database, '/salas/'+IdSalaCriada+'/Partida/lastUpdated');
// const mao_db = ref(database, '/salas/'+IdSalaCriada+'/Partida/mao')
// const jogador_db = ref(database, '/salas/'+IdSalaCriada+'/Partida/jogador_atual')
// const teste = ref(database, '/salas/'+IdSalaCriada+'/Partida/Teste')

export function getCreatedRoom (){
    return IdSalaCriada
}

export function setCreatedRoom (id){
    IdSalaCriada = id
}


/* 
========================
      Operações básicas do Firebase
========================
*/

async function set_firebase (path, info, atualiza=false) {
    set(ref(database, path), info)
    if (atualiza) set(ref(database, '/salas/'+IdSalaCriada+'/Partida/lastUpdated'), Date())
}

export async function get_firebase (path) {
    const caminho = ref(database, path);
    let retorno
    await get(caminho).then((snapshot) => retorno = snapshot.val())
    return retorno
}

async function update_incremento_firebase (path, valor) {
    let resultado = get_firebase(path)
    resultado.then(value_retornado => {
        let valor_atualizado = value_retornado + valor
        set_firebase(path, valor_atualizado)

    })

}

/* 
========================
      Operações referentes as Salas
========================
*/

export function EnterRoom(id, user, idSala){
    set_firebase('/salas/'+idSala+'/players/'+id, user)
}

export function ExitRoom(id, user, idSala, inRoom){
    if (inRoom) set_firebase('/salas/'+idSala+'/players/'+id, null)
}

export function CreateRoom(uid, username) {
    let players = {}
    players[uid] = username

    // A post entry.
    const postSala = {
      author: username,
      uid: uid,
      players: players,
      state: 'inicio'
    };
  
    // Get a key for a new Sala.
    const newSalaKey = push(child(ref(database), 'salas')).key;
    IdSalaCriada = newSalaKey
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/salas/' + newSalaKey] = postSala;
    updates['/salaAtiva'] = newSalaKey;
    update(ref(database), updates)
    SendCarsToServer(newSalaKey)
 
  }

export function SalasInicio (Salas){
    let salas_inicio = JsonToList(Salas).map(sala=>{
        if (sala.value.state=='inicio')  return sala
    })

    return salas_inicio
}

/* 
========================
      Operações Feitas nos inícios de Jogo
========================
*/

export function SendCarsToServer (newSalaKey='', jogadorAtual=0, turno=[0], placares=[0], timeOut=0) {
        let caminhoRoot = '/salas/'+newSalaKey+'/Partida'
        let baralho = LoadCartas()
        let quantidade_cartas = [...Array(12)]
        let mao_1= []
        let mao_2= []
        let mao_3 =[]
        let mao_4 = []
        let monte_lixo =['vazio']
        let monte = baralho.pop()
        let lixo = baralho.pop()
        let jogador = {'placar_atual':0, 'viradas':13, placares, 'placar_total':soma_array(placares)} 

        quantidade_cartas.map(np => mao_1.push(baralho.pop()))
        quantidade_cartas.map(np => mao_2.push(baralho.pop()))
        quantidade_cartas.map(np => mao_3.push(baralho.pop()))
        quantidade_cartas.map(np => mao_4.push(baralho.pop()))
        
        monte_lixo.push(lixo) 

    

        set_firebase(caminhoRoot+'/jogadores/0', distribuirCarta(mao_1, jogador))
        set_firebase(caminhoRoot+'/jogadores/1', distribuirCarta(mao_2, jogador))
        set_firebase(caminhoRoot+'/jogadores/2', distribuirCarta(mao_3, jogador))
        set_firebase(caminhoRoot+'/jogadores/3', distribuirCarta(mao_4, jogador))
        set_firebase(caminhoRoot+'/baralho', baralho)
        set_firebase(caminhoRoot+'/monte', monte)
        set_firebase(caminhoRoot+'/mao', 'vazio')
        set_firebase(caminhoRoot+'/jogador_atual', jogadorAtual)
        set_firebase(caminhoRoot+'/monte_lixo', monte_lixo)
        set_firebase(caminhoRoot+'/lixo', lixo)
        set_firebase(caminhoRoot+'/statusGlobal', 'inicio')
        set_firebase(caminhoRoot+'/turno', turno)

        setTimeout(() => {
            set_firebase(caminhoRoot+'/acao', 'cavar', true)
        }, timeOut);
        
        
}

export function distribuirCarta (cartas, jogador) {
    
    let mao = {'0':[], '1':[], '2':[], '3':[]}

    cartas.map((valor, index) => {
        // Para debug e teste
        //let status = (index<11) ? 'frente' : 'verso' 
        let status='verso' // Quando acabar de Debugar
        // fim debug
        
        if(index<=2) mao['0'].push({'valor':valor, 'status':status})
        else if(index<=5) mao['1'].push({'valor':valor, 'status':status})
        else if(index<=8) mao['2'].push({'valor':valor, 'status':status})
        else if(index<=11) mao['3'].push({'valor':valor, 'status':status})
    })

    jogador['cartas'] = mao
    return jogador
}

// Função não utilizada
// export async function getBaralho (){
//     let retorno
    
//     const returnBaralho = ref(database, '/salas/'+IdSalaCriada+'/Partida/baralho');
//     await get(returnBaralho).then((snapshot) => retorno = snapshot.val())
//     return retorno

// }

export function LoadCartas(){
    
    const count_1a12 = [...Array(13)]
    
    let baralho = []
    let carta = -1


    baralho = Populate(baralho, 15, 0)
    baralho = Populate(baralho, 5, -2)

    count_1a12.map( n=> {
        baralho = Populate(baralho, 10, carta)
        carta = carta+1
        if (carta == 0) carta=carta+1
    }) 

    return Embaralhar(baralho)   
}

export function Populate(baralho, quantidade, valor ){
    
    const range = [...Array(quantidade)]
    range.map( n=> baralho.push(valor))
    return baralho
}

function Embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

/* 
========================
      Atualização de Informações no Game
========================
*/

// Função não utilizada
// export async function getLastUpdated () {
//     let lastUpdated
//     const lastUpdated_get = ref(database, '/salas/'+IdSalaCriada+'/Partida/lastUpdated');
//     await get(lastUpdated_get).then((snapshot) => lastUpdated = snapshot.val())
//     return lastUpdated

// }

export async function set_placar(jogador, valor){  
    update_incremento_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/placar_atual', valor)
}

export function set_placar_atual(jogador, valor){  
    if (typeof(jogador)!='undefined' && typeof(valor)!='undefined') {
        set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/placar_atual', valor)  
    }
     
}

export function vira_carta(jogador, coluna, linha) {
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente')
   
}

export async function viraTodasCartas(jogador){
    get_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas').then(cartas=>
        {
            var oldCartas = JSON.stringify(cartas).replaceAll("verso", "frente")
            var cartasViradas = JSON.parse(oldCartas);
            set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas/', cartasViradas)
        })

}

export function trocarValorDaCarta(jogador, coluna, linha, valor) {
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente')
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/valor',  valor)
    setMao('vazio')
    

}

export function apagarColuna(jogador, coluna){
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/cartas/'+coluna, null)
}

export function descartarColuna(cartas, jogador, coluna, monte){
    
    // Essa função tem que ser chamada no Naipe 
    if (cartas[0].status=='frente' && cartas[0].status == cartas[1].status && cartas[0].status == cartas[2].status){
        if (cartas[0].valor == cartas[1].valor && cartas[0].valor == cartas[2].valor){
          
            monte.push(cartas[0].valor)
            monte.push(cartas[1].valor)
            monte.push(cartas[2].valor)
            descartar(monte)
            apagarColuna(jogador, coluna)
        }
    }
  


}

export async function atualizaJogadorAtual(atualJogador, Contexto, setModal){
    let proximoJogador
    
    let TodasCartasVisiveis = false
    if (Contexto.statusGlobal=='wait') {
        viraTodasCartas (atualJogador)
        TodasCartasVisiveis = true

    }
    
    set_placar_atual(atualJogador, verifica_placar_atual(Contexto.jogadores[atualJogador], TodasCartasVisiveis))

    
    proximoJogador = atualJogador+1

    if (proximoJogador==4) proximoJogador=0
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogador_atual',  proximoJogador, false)
   
    //debug
    // if (Contexto.statusGlobal=='inicio') {
    //     setStatusGlobal('mid')
    //     setTurno()

    // }
    //fim debug
    
    if (Contexto.statusGlobal=='inicio' && Contexto.jogadores[proximoJogador].viradas==10) {
        setStatusGlobal('mid')
        setTurno()

    }
    
    if (Contexto.statusGlobal=='wait' && Contexto.jogadores[proximoJogador].viradas==0) {
        setStatusGlobal('fim')
        setModal(true)
        
        setTimeout(() => {
            setPlacares(Contexto.jogadorQueBateu).then( placares => {   
                SendCarsToServer(Contexto.jogadorQueBateu, Contexto.turno, placares, 1000)
                
            })
            
            
        }, 500);

        
 

    }

    
    
    setAcao('cavar')

}

export function setTurno(){
    get_firebase('/salas/'+IdSalaCriada+'/Partida/turno').then(turno => {
        turno.push(1)
        set_firebase('/salas/'+IdSalaCriada+'/Partida/turno', turno)

    })

}

export function setStatusGlobal(status) {
    
    set_firebase('/salas/'+IdSalaCriada+'/Partida/statusGlobal', status)
    
}

export async function setPlacares(quemBateu){
    let placaresReturn = []
    let duplica = false
    let valorQuemBateu = 0
    get_firebase('/salas/'+IdSalaCriada+'/Partida').then(Contexto =>{
        valorQuemBateu = Contexto.jogadores[quemBateu].placar_atual
        Contexto.jogadores.forEach((jogador, index) => {
            
            let placares = jogador.placares
            if (index!=quemBateu && jogador.placar_atual<=valorQuemBateu) duplica=true
            placares.push(jogador.placar_atual)
            setPlacaresFirebase(index, soma_array(placares), placares)
            placaresReturn.push(placares)
        });
        if (duplica){
            let total = soma_array(placaresReturn[quemBateu]) + valorQuemBateu
            placaresReturn[quemBateu].push(placaresReturn[quemBateu].pop()*2)
            setPlacaresFirebase(quemBateu, total, placaresReturn[quemBateu])
            
        }
        return placaresReturn

    })

}

export function setPlacaresFirebase(index, total, placares){
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+index+'/placar_total', total) 
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+index+'/placares', placares)
}


export async function atualiza_quantidade_viradas (cartas, jogador, statusGlobal) {
  
    let colunas = cartas.filter( function (i) {return i})
    let quantidade = 0
    colunas.map(data => {
        let coluna = data.filter( function (i) {return i})
        coluna.map(carta => {
            if (carta.status=='verso') quantidade++
        })
    })
    set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadores/'+jogador+'/viradas', quantidade)
    if (statusGlobal=='mid' && quantidade==0) {
        setStatusGlobal('wait')
        set_firebase('/salas/'+IdSalaCriada+'/Partida/jogadorQueBateu', jogador)

    } 
    
    
}

export function setMao(valor, monte, ultimoLixo) {
    set_firebase('/salas/'+IdSalaCriada+'/Partida/mao',  valor)
    if (monte=='lixo') set_firebase('/salas/'+IdSalaCriada+'/Partida/lixo', ultimoLixo)
}

export function setAcao(valor) {
    set_firebase('/salas/'+IdSalaCriada+'/Partida/acao',  valor, true)
}

export function verifica_placar_atual(jogadorDict, todasVisiveis=false) {
    let placar_atual = 0
    let cartas = jogadorDict.cartas.filter(function (i) {return i})
    
    for (let coluna = 0; coluna < cartas.length; coluna++) {
        const colunas = cartas[coluna];
        for (let linha = 0; linha < colunas.length; linha++) {
            if (colunas[linha].status=='frente' || todasVisiveis) placar_atual = placar_atual + colunas[linha].valor
            
        }
        
    }
    return placar_atual
    
}


export function verifica_coluna(array) {

    if (array[0][0]===array[1][0] && array[0][1]=='frente' && array[1][1]=='frente'){
        if (array[1][0]===array[2][0] && array[2][1]=='frente') {
            return true
        }
    }
    return false

}


/* 
========================
      Ações dos jogadores
========================
*/

export async function descartar (monte) {
    set_firebase('/salas/'+IdSalaCriada+'/Partida/monte_lixo', monte)
    set_firebase('/salas/'+IdSalaCriada+'/Partida/lixo', monte.at(-1))

}

export async function cavar (baralho) {
    
    let carta_cavada = baralho.pop()
    
    set_firebase('/salas/'+IdSalaCriada+'/Partida/monte', carta_cavada)
    if (baralho.length<2){
        get_firebase('/salas/'+IdSalaCriada+'/Partida/monte_lixo').then(newBaralho => {
            let lixo_atual = newBaralho.pop()
            let baralho = newBaralho
            set_firebase('/salas/'+IdSalaCriada+'/Partida/baralho', baralho)
            set_firebase('/salas/'+IdSalaCriada+'/Partida/lixo', lixo_atual)
        })
        
    } else set_firebase('/salas/'+IdSalaCriada+'/Partida/baralho', baralho)

}




