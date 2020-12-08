function compute_z_array(str){
    const z=new Array(str.length).fill(0)
    let l=0
    let r=0
    for(let i=1;i<str.length;i++){
        z[i]=Math.max(0,Math.min(z[i-l],r-i))
        while((i+z[i]<str.length) && str[z[i]]===str[i+z[i]]){
            z[i]+=1
        }
        if(i+z[i]>r){
            l=i
            r=i+z[i]
        }
    }
    return z
}