function gcd(a, b) {
    if (a === 0) { return b }
    if (b === 0) { return a }
    if (a > b) {
        return gcd(a - b, b)
    } else if (a < b) {
        return gcd(b - a, a)
    } else {
        return b
    }
}

function gcd2(a, b) {
    if (a === 0) { return b }
    if (b === 0) { return a }
    return gcd2(b, a % b)
}

function gcd3(a,b) {
    if (a === 0) { return b }
    if (b === 0) { return a }
    while(b !== 0) {
      const rem = a % b;
      a = b;
      b = rem;
    }
    return a;
}

console.log(gcd(9, 6))
console.log(gcd(1337, 9))

console.log(gcd2(9, 6))
console.log(gcd2(1337, 9))

console.log(gcd3(9, 6))
console.log(gcd3(1337, 9))
