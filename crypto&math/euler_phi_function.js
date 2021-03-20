function gcd(a,b) {
    if (a === 0) { return b }
    if (b === 0) { return a }
    while(b !== 0) {
      const rem = a % b;
      a = b;
      b = rem;
    }
    return a;
}

function phi(n){
    let phi=0;
    for(let i=1;i<n;i++){
        if(gcd(n,i)===1){
            phi++
        }
    }
    return phi
}