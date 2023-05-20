function filterRange(arr, a, b) {
    let results = arr.filter(item => (item >= a) && (item <= b));
    return results;
}
