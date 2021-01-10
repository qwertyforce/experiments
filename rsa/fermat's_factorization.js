function fermat(n) {
    let x = Math.ceil(Math.sqrt(n))
    if (x ** 2 == n) {
        return [x, x]
    }
    for (let i=0;i<50;i++){
        const l=x**2-n
        const y=Math.sqrt(l)
        if(y % 1 === 0){
            return [x-y,x+y]
        }
        x++
    }
}
