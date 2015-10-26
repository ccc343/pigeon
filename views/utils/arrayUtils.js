// Returns the index and value of the minimum of arr.
export function minWithIndex(arr, f) {
  if (!arr.length) return null;

  let min = f(arr[0]), minIndex = 0;

  arr.forEach((item, index) => {
    const value = f(item);
    if (value < min) {
      min = value;
      minIndex = index;
    }
  });

  return { value: min, index: minIndex };
}


// Returns the index and value of the maximum of arr.
export function maxWithIndex(arr, f) {
  if (!arr.length) return null;

  let max = f(arr[0]), maxIndex = 0;

  arr.forEach((item, index) => {
    const value = f(item);
    if (value > max) {
      max = value;
      maxIndex = index;
    }
  });

  return { value: max, index: maxIndex };
}
