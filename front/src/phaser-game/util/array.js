export function pushElementToArray(arr, element, times) {
    if (times === undefined) {
        times = 1;
    }
    if (times <= 0) {
        return arr;
    }
    for (let n = 0; n < times; n++) {
        arr.push(element);
    }
    return arr;
}

export function removeArrayElementByValue(arr) {
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
