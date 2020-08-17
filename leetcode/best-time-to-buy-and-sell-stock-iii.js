/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length===0){
        return 0
    }
    let profits=[]
    
    for(let i=0;i<3;i++){
        profits.push(new Array(prices.length).fill(0))
    }
    for(let i=0;i<prices.length;i++){
        profits[0][i]=0
    }
    for(let i=0;i<3;i++){
        profits[i][0]=0
    }
    for(let k=1;k<3;k++){
        let min=prices[0]
        for (let i=1;i<prices.length;i++){
            min=Math.min(min, prices[i] - profits[k-1][i-1])
            profits[k][i] = Math.max(profits[k][i-1], prices[i] - min);
        }
    }
    return profits[2][prices.length-1]
};