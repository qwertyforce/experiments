function lcs_rec(text1, text2) {
    const cache=new Map()
    function lcs(i,j){
        if(i<=0 || j<=0){
            return 0
        }
        if(cache.get(i.toString()+"@"+j.toString())){
            return cache.get(i.toString()+"@"+j.toString())
        }
         if(text1[i-1]===text2[j-1]){
             const x = 1+lcs(i-1,j-1)
             cache.set(i.toString()+"@"+j.toString(),x)
             return x
         }else{
            const x = Math.max(lcs(i-1,j),lcs(i,j-1))
             cache.set(i.toString()+"@"+j.toString(),x)
            return  x
         }
    }
    return lcs(text1.length,text2.length)
};