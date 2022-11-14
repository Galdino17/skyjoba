


export const distancia = (de, para, eixo) => {
    if (para[eixo] == de[eixo]) return 0
        let distancia = para[eixo] - de[eixo] 
        let real_distancia = (distancia/Math.abs(distancia))*Math.abs(distancia)      
        return real_distancia

}  


export const moveEixo = (de, para, eixo) => {       
    let real_distancia = distancia(de, para, eixo)
    //return [real_distancia+'px', -real_distancia+'px']
    return [-real_distancia+'px', 0+'px']
}

export const move = (locais, de, para) => {
    
    if (!!locais[para]){
        de = locais[de] 
        para = locais[para] 
        let movimentos = {'x': moveEixo(de, para, 'x'), 'y': moveEixo(de, para, 'y')}
        
        return movimentos

    }
    return {'x': [0,0], 'y': [0,0]}
    



}