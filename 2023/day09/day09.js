let input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const getDifferences = (arr, allArrays) => {
  const diffArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    diffArr[i] = arr[i + 1] - arr[i];
  }
  if (diffArr.every((e) => e === 0)) {
    return [[...diffArr, 0], ...allArrays];
  }
  return getDifferences(diffArr, [diffArr, ...allArrays]);
};

const extrapolate = (arr, i, j) => {
  if (!arr[j]) {
    return arr.at(-1).at(-1);
  }

  const lastElement = arr[i].at(-1);

  arr[j].push(arr[j].at(-1) + lastElement);

  return extrapolate(arr, i + 1, j + 1);
};
const part1 = (reverse) => {
  return input
    .split('\n')
    .map((e) => e.split(' ').map(Number))
    .reduce((prev, curr) => {
      if (reverse) {
        curr.reverse();
      }
      const differences = getDifferences(curr, []);

      const extra = extrapolate([...differences, curr], 0, 1);
      return prev + extra;
    }, 0);
};
console.log(part1());

const part2 = () => part1(true);

console.log(part2());
