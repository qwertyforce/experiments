class WeightedRandom {
    constructor(data) {
        this.data = data
        this.total_weight_sum = 0
        this.cumulative_weight_sum = []
        this.init()
    }
    init() {
        for (let {value,weight} of this.data) {
            this.total_weight_sum += weight
            this.cumulative_weight_sum.push([this.total_weight_sum, value])
        }
    }
    binary_search(arr, value) {
        var low = 0;
        var high = arr.length - 1;
        var mid;
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (arr[mid][0] === value) {
                return mid+1
            } else if (arr[mid][0] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    sample() {
        let random = Math.random() * this.total_weight_sum
        const index = this.binary_search(this.cumulative_weight_sum,random )
        return this.data[index]
    }
}

let x = [{ value: 0, weight: 1 }, { value: 1, weight: 2}, { value: 2, weight: 3 }]
const dist = new WeightedRandom(x)

let res=[0,0,0]
for(let i=0;i<100000;i++){
    let x = dist.sample()
    res[x.value]+=1
}

//TODO VoseAliasMethod