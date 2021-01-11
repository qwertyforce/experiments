//https://crypto.stackexchange.com/questions/5791/why-is-it-important-that-phin-is-kept-a-secret-in-rsa
function get_p_q(n, phi_n) {
    const a = 1
    const b = -(n + 1 - phi_n)
    const c = n
    const p = (-b - ((b ** 2) - 4 * a * c) ** 0.5) / (2 * a)
    const q = (-b + ((b ** 2) - 4 * a * c) ** 0.5) / (2 * a)
    return [p, q]
}

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

const N=7 * 191
const PHI_N=phi(N)
console.log(get_p_q(N,PHI_N))