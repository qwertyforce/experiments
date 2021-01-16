function extended_gcd(a, b) {
    if (a === 0) { 
        return [b,0,1]
    }else{
        let [g,y,x]=extended_gcd(b%a,a)
        return [g, x - Math.floor(b / a) * y, y]
    }
}

