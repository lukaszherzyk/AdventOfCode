const input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      count++;
    } else {
      count--;
    }
  }
  return count;
};

const part2 = () => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      count++;
    } else {
      count--;
    }
    if (count === -1) {
      return i + 1;
    }
  }
};

console.log(part1());
console.log(part2());
