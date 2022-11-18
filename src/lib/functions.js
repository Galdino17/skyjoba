

export function soma_array(array) {
        const sum = array.reduce((partialSum, a) => partialSum + a, 0);
        return sum
    
}

export function compareMatriz( a, b ) {
    if ( a.total < b.total ){
       console.log(a) 
      return -1;
    }
    if ( a.total > b.total ){
      return 1;
    }
    return 0;
  }