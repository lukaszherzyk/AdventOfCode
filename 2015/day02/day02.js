let input = '2x3x4';

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  let total = 0;

  input.split('\n').forEach((dim) => {
    const [l, w, h] = dim.split('x').map(Number);
    const allValues = [l * w, w * h, h * l];
    const extra = Math.min(...allValues);
    total +=
      allValues.reduce((prev, curr) => {
        return 2 * curr + prev;
      }, 0) + extra;
  });
  return total;
};
const part2 = () => {
  let total = 0;

  input.split('\n').forEach((dim) => {
    const [l, w, h] = dim.split('x').map(Number);
    const cubic = l * w * h;
    const allValues = [l, w, h].sort((a, b) => a - b);

    total += 2 * allValues[0] + 2 * allValues[1] + cubic;
  });
  return total;
};
console.log('part1:', part1());
console.log('part2:', part2());
