/**
 * @param {number[]} prices
 * @return {number}
 */
 //https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75931/Easiest-JAVA-solution-with-explanations
var maxProfit = function(prices) {
    if (prices.length<=1){
        return 0
    }
    let buy=[]  //buy[i] - profit at i, last action = buy
    let sell=[] //buy[i] - profit at i, last action = sell
    buy[0]  = -prices[0];
    buy[1]  = -Math.min(prices[0], prices[1]);
    sell[0]=0
    sell[1] = Math.max(0, buy[0] + prices[1]);
    for(let i = 2;i<prices.length;i++){
        buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);    // do nothing  || sell,cooldown,buy
        sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);   // do nothing  || buy,sell
    }
    console.log(sell)
    return sell[sell.length-1]
};