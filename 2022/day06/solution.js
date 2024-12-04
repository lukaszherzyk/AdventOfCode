let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = (input, numberOfDiffrentCharacters) => {
  for (let i = 0; i < input.length; i++) {
    if (
      [...new Set(input.slice(i, i + numberOfDiffrentCharacters).split(''))].length ===
      numberOfDiffrentCharacters
    ) {
      return i + numberOfDiffrentCharacters;
    }
  }
};

console.log('part1: ', part1(input, 4));
console.log('part2: ', part1(input, 14));
