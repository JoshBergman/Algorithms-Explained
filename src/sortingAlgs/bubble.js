function swap(arr, selectedindex, pivotindex) {
    let temp = arr[pivotindex];
    arr[pivotindex] = arr[selectedindex];
    arr[selectedindex] = temp;
}

function bubbleSort(arr) {
    let i, j;
    let size = arr.length - 1;
    for (i = 0; i < size; i++) {
        for (j = 0; j < size - i) {
            // TODO, implament visualization flags. Perhaps as observers?
            // pivot = arr[j+1]
            // selected = arr[j]
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);

            }
        }
    }
}