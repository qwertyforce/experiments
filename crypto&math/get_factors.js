function get_factors(n){
	const factors=[]
	for(let i=1;i<=Math.sqrt(n);i++){
		if(n % i==0){
			factors.push(i)
			if(i!==n/i){
				factors.push(n/i)
			}
		}
	}
	return factors
}