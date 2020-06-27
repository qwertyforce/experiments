function binary_search(arr, value) {
    var low = 0;
    var high = Arr.length - 1;
    var mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (Arr[mid] === value) {
            return mid
        } else if (Arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}