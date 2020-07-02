//https://leetcode.com/problems/partition-equal-subset-sum/
//https://leetcode.com/problems/partition-equal-subset-sum/discuss/90592/01-knapsack-detailed-explanation

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const _sum = nums.reduce((acc, cur) => acc + cur)
    console.log(_sum)
    if (_sum % 2 !== 0) {
        return false
    }
    let target_sum = _sum / 2
    let dp_arr = new Array(nums.length + 1).fill(0).map(() => new Array(target_sum + 1).fill(false))
    for (let sum = 1; sum < target_sum + 1; sum++) {
        dp_arr[0][sum] = false //if we have 0 numbers we cant achieve sum
    }
    for (let num = 0; num < nums.length + 1; num++) {
        dp_arr[num][0] = true //we can achieve sum of 0 with any number of numbers
    }
    console.log(dp_arr)
    for (let num = 1; num < nums.length + 1; num++) {
        for (let sum = 1; sum < target_sum + 1; sum++) {
            dp_arr[num][sum] = dp_arr[num - 1][sum]; //if previous is true than current is also true because we can  take no number
            if (sum >= nums[num - 1]) { 
                dp_arr[num][sum] = (dp_arr[num][sum] || dp_arr[num - 1][sum - nums[num - 1]]);
            }
        }
    }
    return dp_arr[nums.length][target_sum]
};