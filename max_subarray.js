function max_subarray(nums) {
    let best_sum = -Infinity
    let current_sum = -Infinity
    for (let i = 0; i < nums.length; i++) {
        current_sum = Math.max(current_sum + nums[i], nums[i]);
        best_sum = Math.max(best_sum, current_sum)
    }
    return best_sum
};