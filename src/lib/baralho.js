
import { db, app } from "./firebase";
import { getDatabase, ref, set, onValue, update, get } from "firebase/database";


const database = getDatabase();

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

        set(ref(database, '/PartidaTeste/jogadores/1/cartas'), distribuirCarta(mao_1))
        set(ref(database, '/PartidaTeste/jogadores/2/cartas'), distribuirCarta(mao_2))
        set(ref(database, '/PartidaTeste/jogadores/3/cartas'), distribuirCarta(mao_3))
        set(ref(database, '/PartidaTeste/jogadores/4/cartas'), distribuirCarta(mao_4))
        set(ref(database, '/PartidaTeste/baralho'), baralho)
        set(ref(database, '/PartidaTeste/monte'), monte)
        set(ref(database, '/PartidaTeste/lixo'), lixo)
        
      
    console.log('enviado')
}

export function distribuirCarta (cartas) {
        console.log('v-'+cartas)
        let mao = {'c0':[], 'c1':[], 'c2':[], 'c3':[]}
        cartas.map((valor, index) => {
            
            if(index<=2) mao['c0'].push(valor)
            else if(index<=5) mao['c1'].push(valor)
            else if(index<=8) mao['c2'].push(valor)
            else if(index<=11) mao['c3'].push(valor)
        })

        console.log('...'+mao[3])
        return mao
}


export async function cavar () {
    

    let baralho = await getBaralho()
    let carta = baralho.pop()

    const database = getDatabase();
    update(ref(database, '/PartidaTeste'), {
        baralho: baralho
    })
    
    return carta

}


export async function getBaralho (){
    const database = getDatabase();
    let retorno
    
    const returnBaralho = ref(database, '/PartidaTeste/baralho');
    await get(returnBaralho).then((snapshot) => retorno = snapshot.val())
    // get(starCountRef, (snapshot) => {
    //       const baralho =  snapshot.val();
    //       retorno = baralho
    //     });
        return retorno

}

export async function getCartasJogador (jogador, index){
    
    const database = getDatabase();
    let retorno =[]
    
    const returnBaralho = ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas/c'+index);
    await get(returnBaralho).then((snapshot) => {
        snapshot.val().forEach( value => {
            console.log('++'+value)
            retorno.push(value)
        })
    })
    
        return retorno
}

export async function getMonte (){
    
    const database = getDatabase();
    let mont_v, lixo_v
    
    const monte = ref(database, '/PartidaTeste/monte');
    const lixo = ref(database, '/PartidaTeste/lixo');
    await get(monte).then((snapshot) => mont_v = snapshot.val())
    await get(lixo).then((snapshot) => lixo_v = snapshot.val())
       

        return [mont_v, lixo_v]
}

export async function getCartas (jogador){
    
    let baralho = await cavar(12)
    
    await set(ref(database, '/PartidaTeste/jogadores/'+jogador+'/cartas'), baralho)
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