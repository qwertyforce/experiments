function get_prime_factors(n){
	const factors=[]
	let i=2
	while(i<=n){
		if(n % i==0){
			factors.push(i)
			n=n/i
		}else{
			i+=1
		}
	}
	return factors
}
get_prime_factors(126)