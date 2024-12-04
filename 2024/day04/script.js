let input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

// input = require('fs')
//   .readFileSync(__dirname + '/input.txt')
//   .toString();

const xmasRegex = /XMAS/g;

const part1 = () => {
  return [...input.matchAll(xmasRegex)].length;
};

const part2 = () => {};

console.log(part1());
console.log(part2());
