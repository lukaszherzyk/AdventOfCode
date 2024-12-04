let input = `3   4
4   3
2   5
1   3
3   9
3   3`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  const [a, b] = input
    .split('\n')
    .map((e) =>
      e
        .split('\n')
        .map((e) => e.split('  ').flat().map(Number).flat())
        .flat()
    )
    .reduce(
      (prev, curr) => {
        return [
          [...prev[0], curr[0]],
          [...prev[1], curr[1]]
        ];
      },
      [[], []]
    )
    .map((e) => e.sort((a, b) => a - b));

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    console.log({ a: a[i], b: b[i], distance: Math.abs(a[i] - b[i]) });
    sum += Math.abs(a[i] - b[i]);
  }
  return sum;
};

const part2 = () => {
  const [a, b] = input
    .split('\n')
    .map((e) =>
      e
        .split('\n')
        .map((e) => e.split('  ').flat().map(Number).flat())
        .flat()
    )
    .reduce(
      (prev, curr) => {
        return [
          [...prev[0], curr[0]],
          [...prev[1], curr[1]]
        ];
      },
      [[], []]
    );
  const map = new Map();
  let sum = 0;
  for (let i = 0; i < b.length; i++) {
    const n = b[i];

    if (map.has(n)) {
      map.set(n, map.get(n) + 1);
    } else {
      map.set(n, 1);
    }
  }

  return a.reduce((sum, curr) => {
    return sum + (map.get(curr) ?? 0) * curr;
  }, 0);
};

//console.log('part1:  ', part1());
console.log('part2:  ', part2());
