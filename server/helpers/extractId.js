export default (key, arr) => {
  const result = [];
  for (let x = 0; x < arr.length; x += 1) {
    result.push(arr[x][key]);
  }
  return result;
};
