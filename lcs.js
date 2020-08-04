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

function lcs_dp(text1, text2) {
    let dp=[]
    for(let i = 0; i <= text1.length; i++) {
        dp.push(new Array(text2.length + 1).fill(0));
    }
    for(let i=0;i<dp[0].length;i++){
        dp[0][i]=0
    }
    for(let i=0;i<dp.length;i++){
        dp[i][0]=0
    }
    for(let i=1;i<dp.length;i++){
        for(let j=1;j<dp[0].length;j++){
            if(text1[i-1]===text2[j-1]){
                dp[i][j]=dp[i-1][j-1]+1
            }else{
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[dp.length-1][dp[0].length-1]
};