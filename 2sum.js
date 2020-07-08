function two_sum(nums, target) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        } else {
            map.set(nums[i], i);
        }
    }
    return [];
};

function two_sum_2(nums, target) {
    let not_sorted = nums.slice()
    nums.sort((a, b) => a - b)
    let low = 0
    let high = nums.length - 1
    while (low !== high) {
        let sum = nums[low] + nums[high]
        if (sum < target) {
            low++
        } else if (sum > target) {
            high--
        } else {
            return [not_sorted.indexOf(nums[low]), not_sorted.lastIndexOf(nums[high])]
        }
    }
    return []
};