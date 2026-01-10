function getMinMax(str) {
  let words = str.split(' ');
  let numbers = words
    .map(word => parseFloat(word))
    .filter(num => !isNaN(num));
  let min = Math.min(...numbers);
  let max = Math.max(...numbers);
  return { min, max };
}
