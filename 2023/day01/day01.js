let input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  return input
    .split('\n')
    .map((line) => line.split('').filter((e) => e.match(/^[0-9]/)))
    .map((e) => (e.length === 1 ? Number(e[0] + e[0]) : Number(e.shift() + e.pop())))
    .reduce((prev, curr) => prev + curr, 0);
};
console.log(part1());

// part 2

const mapper = (key) => {
  switch (key) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return key;
  }
};
const part2 = () => {
  return input
    .split('\n')
    .map((line) => {
      const matches = [
        ...line.matchAll(/(?=(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine))/g)
      ].map((e) => mapper(e[1]));

      if (matches.length === 1) {
        return Number(matches[0] + matches[0]);
      }
      return Number(matches.shift() + matches.pop());
    })
    .reduce((prev, curr) => prev + curr, 0);
};

console.log(part2());
