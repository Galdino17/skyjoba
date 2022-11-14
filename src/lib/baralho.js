
import { db, app } from "./firebase";
import { getDatabase, ref, set, query, update, get } from "firebase/database";
import Carta from "../componentes/carta";
import { getFirestore } from "firebase/firestore";


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

export function SendCarsToServer () {
        let baralho = LoadCartas()
        let quantidade_cartas = [...Array(12)]
        let mao_1= []
        let mao_2= []
        let mao_3 =[]
        let mao_4 = []
        let monte_lixo =['vazio']
        let monte = baralho.pop()
        let lixo = baralho.pop()


        quantidade_cartas.map(np => mao_1.push(baralho.pop()))
        quantidade_cartas.map(np => mao_2.push(baralho.pop()))
        quantidade_cartas.map(np => mao_3.push(baralho.pop()))
        quantidade_cartas.map(np => mao_4.push(baralho.pop()))
        
        monte_lixo.push(lixo) 

        set_firebase('/PartidaTeste/jogadores/0', distribuirCarta(mao_1))
        set_firebase('/PartidaTeste/jogadores/1', distribuirCarta(mao_2))
        set_firebase('/PartidaTeste/jogadores/2', distribuirCarta(mao_3))
        set_firebase('/PartidaTeste/jogadores/3', distribuirCarta(mao_4))
        set_firebase('/PartidaTeste/baralho', baralho)
        set_firebase('/PartidaTeste/monte', monte)
        set_firebase('/PartidaTeste/mao', 'vazio')
        set_firebase('/PartidaTeste/jogador_atual', 0)
        set_firebase('/PartidaTeste/monte_lixo', monte_lixo)
        set_firebase('/PartidaTeste/lixo', lixo)
        set_firebase('/PartidaTeste/statusGlobal', 'inicio')
        set_firebase('/PartidaTeste/acao', 'cavar', true)
        
}

export function distribuirCarta (cartas) {
    let jogador = {'placar_atual':0, 'placar_total':0, 'viradas':13}
    let mao = {'0':[], '1':[], '2':[], '3':[]}
    cartas.map((valor, index) => {
        
        if(index<=2) mao['0'].push({'valor':valor, 'status':'verso'})
        else if(index<=5) mao['1'].push({'valor':valor, 'status':'verso'})
        else if(index<=8) mao['2'].push({'valor':valor, 'status':'verso'})
        else if(index<=11) mao['3'].push({'valor':valor, 'status':'verso'})
    })

    jogador['cartas'] = mao
    return jogador
}

export async function set_placar(jogador, valor){
    
    update_incremento_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor)
}



export function set_placar_atual(jogador, valor){   
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor)   
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


export function atualizaJogadorAtual(jogador, Contexto){

    set_placar_atual(jogador, verifica_placar_atual(Contexto.jogadores[jogador]))
    jogador = jogador+1

    if (jogador==4) jogador=0
    

    set_firebase('/PartidaTeste/jogador_atual',  jogador, false)
    set_firebase('/PartidaTeste/jogador_atual',  jogador, false)
    
    
    if (Contexto.statusGlobal=='inicio' && Contexto.jogadores[jogador].viradas==10) setStatusGlobal('mid')
    if (Contexto.statusGlobal=='mid' && Contexto.jogadores[jogador].viradas==0) setStatusGlobal('fim')
    setAcao('cavar')

}

export function setStatusGlobal(status) {
    set_firebase('/PartidaTeste/statusGlobal', status)
}

export async function atualiza_quantidade_viradas (cartas, jogador) {

    let colunas = cartas.filter( function (i) {return i})
    let quantidade = 0
    colunas.map(data => {
        let coluna = data.filter( function (i) {return i})
        coluna.map(carta => {
            if (carta.status=='verso') quantidade++
        })
    })
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/viradas', quantidade)
    
    
}

export function setMao(valor, monte, ultimoLixo) {
    set_firebase('/PartidaTeste/mao',  valor)
    if (monte=='lixo') set_firebase('/PartidaTeste/lixo', ultimoLixo)
}

export function setAcao(valor) {
    set_firebase('/PartidaTeste/acao',  valor, true)
}

export function verifica_placar_atual(jogadorDict) {
    let placar_atual = 0
    let cartas = jogadorDict.cartas.filter(function (i) {return i})
    
    for (let coluna = 0; coluna < cartas.length; coluna++) {
        const colunas = cartas[coluna];
        for (let linha = 0; linha < colunas.length; linha++) {
            if (colunas[linha].status=='frente') placar_atual = placar_atual + colunas[linha].valor
            
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