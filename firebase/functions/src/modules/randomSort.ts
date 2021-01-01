
export function randomSort(array: Array<any>) {
  const deepCopy = JSON.parse(JSON.stringify(array));

  // Fisher–Yates
  for (let i = deepCopy.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const temp = deepCopy[i];
    deepCopy[i] = deepCopy[r];
    deepCopy[r] = temp;
  }

  return deepCopy;
}
