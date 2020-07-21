function binary_search(arr, value) {
    var low = 0;
    var high = arr.length - 1;
    var mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (arr[mid] === value) {
            return mid
        } else if (arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}