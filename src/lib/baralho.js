
import { db, app } from "./firebase";
import { getDatabase, ref, set, query, update, get } from "firebase/database";


export const database = getDatabase();
export const monte = ref(database, '/PartidaTeste/monte');
export const lixo = ref(database, '/PartidaTeste/lixo');
export const animation = ref(database, '/PartidaTeste/lastAnimation')
export const partida = ref(database, '/PartidaTeste');
export const lastUpdated = ref(database, '/PartidaTeste/lastUpdated');
export const mao_db = ref(database, '/PartidaTeste/mao')
export const jogador_db = ref(database, '/PartidaTeste/jogador_atual')
export const teste = ref(database, '/PartidaTeste/Teste')




async function set_firebase (path, info, atualiza=true) {
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

        set_firebase('/PartidaTeste/jogadores/0', distribuirCarta(mao_1), false)
        set_firebase('/PartidaTeste/jogadores/1', distribuirCarta(mao_2), false)
        set_firebase('/PartidaTeste/jogadores/2', distribuirCarta(mao_3), false)
        set_firebase('/PartidaTeste/jogadores/3', distribuirCarta(mao_4), false)
        set_firebase('/PartidaTeste/baralho', baralho, false)
        set_firebase('/PartidaTeste/monte', monte, false)
        set_firebase('/PartidaTeste/mao', 'vazio', false)
        set_firebase('/PartidaTeste/jogador_atual', 0, false)
        set_firebase('/PartidaTeste/monte_lixo', monte_lixo, false)
        set_firebase('/PartidaTeste/lixo', lixo, false)
        set_firebase('/PartidaTeste/acao', 'cavar')
        
}

export function distribuirCarta (cartas) {
    let jogador = {'placar_atual':0, 'placar_total':0}
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
    // let resultado = get_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual')
    // resultado.then(value_retornado => {
    //     let valor_atualizado = value_retornado + valor
    //     set_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor_atualizado)

    // })
    
}



export async function set_placar_atual(jogador, valor){
    
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor, false)
    // let resultado = get_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual')
    // resultado.then(value_retornado => {
    //     let valor_atualizado = value_retornado + valor
    //     set_firebase('/PartidaTeste/jogadores/'+jogador+'/placar_atual', valor_atualizado)

    // })
    
}

export async function descartar (monte) {
    set_firebase('/PartidaTeste/monte_lixo', monte, false)
    set_firebase('/PartidaTeste/lixo', monte.at(-1), false)

}



export async function cavar (baralho) {
    
    let carta_cavada = baralho.pop()
    set_firebase('/PartidaTeste/baralho', baralho)
    set_firebase('/PartidaTeste/monte', carta_cavada, false)

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

export function vira_carta(jogador, coluna, linha, count) {
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente')
    atualiza_quantidade_viradas(jogador, count)  
}

export function trocarValorDaCarta(jogador, coluna, linha, valor) {
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/status',  'frente', false)
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/'+coluna+'/'+linha+'/valor',  valor)
    setMao('vazio')
    

}

export function descartarColuna(cartas, naipe, col){
    // Essa função tem que ser chamada no Naipe 
    if (cartas[0].status=='frente' && cartas[0].status == cartas[1].status && cartas[0].status == cartas[2].status){
        console.log('coluna %d do naipe %d está toda virada', col, naipe)
        if (cartas[0].valor == cartas[1].valor && cartas[0].valor == cartas[2].valor){
            console.log('descarta')
        }
    }
  


}


export function atualizaJogadorAtual(jogador){
    jogador = jogador+1
    if (jogador==4) jogador=0
    
    set_firebase('/PartidaTeste/jogador_atual',  jogador, false)
    setAcao('cavar')

}

export async function atualiza_quantidade_viradas (jogador, count) {
    update_incremento_firebase('/PartidaTeste/jogadores/'+jogador+'/viradas', count)
}

export function setMao(valor, monte, ultimoLixo) {
    set_firebase('/PartidaTeste/mao',  valor)
    if (monte=='lixo') set_firebase('/PartidaTeste/lixo', ultimoLixo)
}

export function setAcao(valor) {
    set_firebase('/PartidaTeste/acao',  valor)
}

export function verifica_placar_atual(jogador) {
    let placar_atual = 0
    for (let coluna = 0; coluna < jogador.cartas.length; coluna++) {
        const colunas = jogador.cartas[coluna];
        for (let linha = 0; linha < colunas.length; linha++) {
            if (colunas[linha].status=='frente') placar_atual = placar_atual + parseInt(colunas[linha].valor) 
            
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