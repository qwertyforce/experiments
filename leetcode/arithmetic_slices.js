/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function(A) {
    if(A.length<3){
        return 0
    }
     let ans=0
     function calc_number(n){
         n-=2
         return n*(n+1)/2
         
     }
     let current_diff=A[0]-A[1]
     let start_of_seq=0
     // let x=0
    for(let i=1;i<A.length-1;i++){
        if(A[i]-A[i+1]===current_diff){
            // x++
            continue
        }else{
            // x=0
            if(i-start_of_seq+1>=3){
               ans+=calc_number(i-start_of_seq+1) 
            }
            current_diff=A[i]-A[i+1]
            start_of_seq=i
        }
    }
     if(A.length-start_of_seq>=3){ans+=calc_number(A.length-start_of_seq)}
     // if(x+2===A.length){return calc_number(A.length)}
     return ans
 };