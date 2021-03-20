//https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm
function extended_gcd(a, b) {
    if (a === 0) {
        return [b, 0, 1]
    } else {
        const [g, y, x] = extended_gcd(b % a, a)
        return [g, x - Math.floor(b / a) * y, y]
    }
}

function modular_inverse(a, m) {
    const [g, x] = extended_gcd(a, m)
    if (g !== 1) {
        throw 'modular inverse does not exist'
    }
    else {
        return x % m
    }
}