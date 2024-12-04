let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () =>
  Math.max(
    ...input.split(/\ns*\n/).map((g) =>
      g
        .split('\n')
        .map(Number)
        .reduce((a, b) => a + b, 0)
    )
  );

const part2 = () => {
  return input
    .split(/\ns*\n/)
    .map((g) =>
      g
        .split('\n')
        .map(Number)
        .reduce((a, b) => a + b, 0)
    )

    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
};

console.log('part1:', part1());
console.log('part2:', part2());
