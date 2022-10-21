
import { db, app } from "./firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";


const database = getDatabase();

export function SendCarsToServer (path, baralho) {

        let Sended_baralho = {baralho}
        
        set(ref(database, '/'+path), Sended_baralho)
      
    console.log('enviado')
}



function Embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function getCartas (){
    const database = getDatabase();
    let baralho = []
    const starCountRef = ref(database, '/PartidaTeste');
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          baralho = data['baralho']
          
        });

    let mao = []

    const colunas = [...Array(4)] //Ajustar
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

