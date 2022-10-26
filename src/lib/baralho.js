
import { db, app } from "./firebase";
import { getDatabase, ref, set, onValue, update, get } from "firebase/database";


export const database = getDatabase();
export const monte = ref(database, '/PartidaTeste/monte');
export const lixo = ref(database, '/PartidaTeste/lixo');

async function set_firebase (path, info) {
    set(ref(database, path), info)
    set(ref(database, '/PartidaTeste/lastUpdated'), Date())

}

export function SendCarsToServer () {
        let baralho = LoadCartas()
        let quantidade_cartas = [...Array(12)]
        let mao_1= []
        let mao_2= []
        let mao_3 =[]
        let mao_4 = []


        quantidade_cartas.map(np => mao_1.push(baralho.pop()))
        quantidade_cartas.map(np => mao_2.push(baralho.pop()))
        quantidade_cartas.map(np => mao_3.push(baralho.pop()))
        quantidade_cartas.map(np => mao_4.push(baralho.pop()))
        let monte = baralho.pop()
        let lixo =  baralho.pop()
        set_firebase('/PartidaTeste/jogadores/1/cartas', distribuirCarta(mao_1))
        set_firebase('/PartidaTeste/jogadores/2/cartas', distribuirCarta(mao_2))
        set_firebase('/PartidaTeste/jogadores/3/cartas', distribuirCarta(mao_3))
        set_firebase('/PartidaTeste/jogadores/4/cartas', distribuirCarta(mao_4))
        set_firebase('/PartidaTeste/baralho', baralho)
        set_firebase('/PartidaTeste/monte', monte)
        set_firebase('/PartidaTeste/lixo', lixo)
        set_firebase('/PartidaTeste/jogador_atual', 1)
        
}

export function distribuirCarta (cartas) {
        
        let mao = {'c0':[], 'c1':[], 'c2':[], 'c3':[]}
        cartas.map((valor, index) => {
            
            if(index<=2) mao['c0'].push({'valor':valor, 'status':'verso'})
            else if(index<=5) mao['c1'].push({'valor':valor, 'status':'verso'})
            else if(index<=8) mao['c2'].push({'valor':valor, 'status':'verso'})
            else if(index<=11) mao['c3'].push({'valor':valor, 'status':'verso'})
        })

        return mao
}

export async function cavar () {
    

    let baralho = await getBaralho()
    let carta = baralho.pop()

    update(ref(database, '/PartidaTeste'), {
        baralho: baralho
    })
    
    return carta

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

export async function getCartasJogador (jogador, index){
    
    
    let retorno =[]
    let lastUpdated = await getLastUpdated()
    const returnBaralho = ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+index);
    await get(returnBaralho).then((snapshot) => {
        snapshot.val().forEach( value => {
            retorno.push(value)
        })
    })
    
        return [retorno, lastUpdated]
}

export async function getMonte (){
    
    
    let mont_v, lixo_v


    await get(monte).then((snapshot) => mont_v = snapshot.val())
    await get(lixo).then((snapshot) => lixo_v = snapshot.val())
       

        return [mont_v, lixo_v]
}

export async function getCartas (jogador){
    
    let baralho = await cavar(12)
    
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas', baralho)
    let mao = []

    const colunas = [...Array(4)] 
    const coluna = [...Array(3)]
    colunas.map( n=> {
        let coluna_card = []
        coluna.map( np =>
            coluna_card.push(baralho.pop())
        )
        mao.push(coluna_card)

    })  

    return mao
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

export function vira_carta(jogador, coluna, linha, valor) {
    set_firebase('/PartidaTeste/jogadores/'+jogador+'/cartas/c'+coluna+'/'+linha+'/status',  'frente')

    if (jogador==4) jogador=0
    jogador = jogador+1
    set_firebase('/PartidaTeste/jogador_atual',  jogador)

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