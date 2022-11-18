
import { db, app } from "./firebase";
import { getDatabase, ref, set, query, update, get } from "firebase/database";
import { soma_array } from "./functions";


export const database = getDatabase();
export const monte = ref(database, '/PartidaTeste/monte');
export const lixo = ref(database, '/PartidaTeste/lixo');
export const animation = ref(database, '/PartidaTeste/lastAnimation')
export const partida = ref(database, '/PartidaTeste');
export const lastUpdated = ref(database, '/PartidaTeste/lastUpdated');
export const mao_db = ref(database, '/PartidaTeste/mao')
export const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
export const teste = ref(database, '/PartidaTeste/Teste')




async function set_firebase (path, info, atualiza=false) {
    
    set(ref(database, path), info)
    // Só atualizar lastUpdate com mudança de ação
    if (atualiza) set(ref(database, '/PartidaTeste/lastUpdated'), Date())

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

export function SendCarsToServer (jogadorAtual=0, turno=[0], placares=[0], timeOut=0) {
        
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

    

        set_firebase('/PartidaTeste/jogadores/0', distribuirCarta(mao_1, jogador))
        set_firebase('/PartidaTeste/jogadores/1', distribuirCarta(mao_2, jogador))
        set_firebase('/PartidaTeste/jogadores/2', distribuirCarta(mao_3, jogador))
        set_firebase('/PartidaTeste/jogadores/3', distribuirCarta(mao_4, jogador))
        set_firebase('/PartidaTeste/baralho', baralho)
        set_firebase('/PartidaTeste/monte', monte)
        set_firebase('/PartidaTeste/mao', 'vazio')
        set_firebase('/PartidaTeste/jogador_atual', jogadorAtual)
        set_firebase('/PartidaTeste/monte_lixo', monte_lixo)
        set_firebase('/PartidaTeste/lixo', lixo)
        set_firebase('/PartidaTeste/statusGlobal', 'inicio')
        set_firebase('/PartidaTeste/turno', turno)

        setTimeout(() => {
            set_firebase('/PartidaTeste/acao', 'cavar', true)
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

export async function set_placar(jogador, valor){
    
    update_incremento_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor)
}



export function set_placar_atual(jogador, valor){  
    if (typeof(jogador)!='undefined' && typeof(valor)!='undefined') {
        set_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor)  
    }
     
}

export async function descartar (monte) {
    set_firebase('/PartidaTeste/monte_lixo', monte)
    set_firebase('/PartidaTeste/lixo', monte.at(-1))

}



export async function cavar (baralho) {
    
    let carta_cavada = baralho.pop()
    
    set_firebase('/PartidaTeste/monte', carta_cavada)
    if (baralho.length<2){
        get_firebase('/PartidaTeste/monte_lixo').then(newBaralho => {
            let lixo_atual = newBaralho.pop()
            let baralho = newBaralho
            set_firebase('/PartidaTeste/baralho', baralho)
            set_firebase('/PartidaTeste/lixo', lixo_atual)
            


        })
        
    } else set_firebase('/PartidaTeste/baralho', baralho)

}


export async function getBaralho (){
    let retorno
    
    const returnBaralho = ref(database, '/PartidaTeste/baralho');
    await get(returnBaralho).then((snapshot) => retorno = snapshot.val())
    // get(starCountRef, (snapshot) => {
    //       const baralho =  snapshot.val();
    //       retorno = baralho
    //     });
        return retorno

}

export async function getLastUpdated () {
    let lastUpdated
    const lastUpdated_get = ref(database, '/PartidaTeste/lastUpdated');
    await get(lastUpdated_get).then((snapshot) => lastUpdated = snapshot.val())
    return lastUpdated

}


export function vira_carta(jogador, coluna, linha) {
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente')
   
}

export async function viraTodasCartas(jogador){
    get_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas').then(cartas=>
        {
            var oldCartas = JSON.stringify(cartas).replaceAll("verso", "frente")
            var cartasViradas = JSON.parse(oldCartas);
            set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/', cartasViradas)
        })

}

export function trocarValorDaCarta(jogador, coluna, linha, valor) {
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente')
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/valor',  valor)
    setMao('vazio')
    

}

export function apagarColuna(jogador, coluna){
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna, null)
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
    set_firebase('/PartidaTeste/jogador_atual',  proximoJogador, false)
   
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
    get_firebase('/PartidaTeste/turno').then(turno => {
        turno.push(1)
        set_firebase('/PartidaTeste/turno', turno)

    })

}

export function setStatusGlobal(status) {
    
    set_firebase('/PartidaTeste/statusGlobal', status)
    
}

export async function setPlacares(quemBateu){
    let placaresReturn = []
    let duplica = false
    let valorQuemBateu = 0
    get_firebase('/PartidaTeste').then(Contexto =>{
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
    set_firebase('/PartidaTeste/jogadores/'+index+'/placar_total', total) 
    set_firebase('/PartidaTeste/jogadores/'+index+'/placares', placares)
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
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/viradas', quantidade)
    if (statusGlobal=='mid' && quantidade==0) {
        setStatusGlobal('wait')
        set_firebase('/PartidaTeste/jogadorQueBateu', jogador)

    } 
    
    
}

export function setMao(valor, monte, ultimoLixo) {
    set_firebase('/PartidaTeste/mao',  valor)
    if (monte=='lixo') set_firebase('/PartidaTeste/lixo', ultimoLixo)
}

export function setAcao(valor) {
    set_firebase('/PartidaTeste/acao',  valor, true)
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

export async function verifica_placar(jogador_n) {
    return false
    const jogador = ref(database, '/PartidaTeste/jogadores/'+jogador_n);
    await get(jogador).then((snapshot) => retorno = snapshot.val())

    if (array[0][0]===array[1][0] && array[0][1]=='frente' && array[1][1]=='frente'){
        if (array[1][0]===array[2][0] && array[2][1]=='frente') {
            return true
        }
    }
    return false

}



export function verifica_coluna(array) {

    if (array[0][0]===array[1][0] && array[0][1]=='frente' && array[1][1]=='frente'){
        if (array[1][0]===array[2][0] && array[2][1]=='frente') {
            return true
        }
    }
    return false

}

export function fimPartida(Contexto) {


}

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