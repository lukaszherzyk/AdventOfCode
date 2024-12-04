let input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  const isSafe = (level) => {
    if (level[0] === level[1]) {
      return false;
    }

    const isIncreasing = level[0] < level[1];

    for (let i = 0; i < level.length; i++) {
      if (isIncreasing) {
        if (level[i] >= level[i + 1] || level[i + 1] - level[i] > 3) {
          return false;
        }
      } else if (level[i] <= level[i + 1] || level[i] - level[i + 1] > 3) {
        return false;
      }
    }
    return true;
  };

  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number))
    .reduce((prev, curr) => {
      return prev + (isSafe(curr) ? 1 : 0);
    }, 0);
};

const part2 = () => {
  const isSafe = (level) => {
    if (level[0] === level[1]) {
      return false;
    }

    const isIncreasing = level[0] < level[1];

    for (let i = 0; i < level.length; i++) {
      if (isIncreasing) {
        if (level[i] >= level[i + 1] || level[i + 1] - level[i] > 3) {
          return false;
        }
      } else if (level[i] <= level[i + 1] || level[i] - level[i + 1] > 3) {
        return false;
      }
    }
    return true;
  };

  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number))
    .reduce((prev, curr) => {
      if (isSafe(curr)) {
        return prev + 1;
      }
      for (let i = 0; i < curr.length; i++) {
        if (isSafe([...curr.slice(0, i), ...curr.slice(i + 1)])) {
          return prev + 1;
        }
      }
      return prev;
    }, 0);
};

console.log('part1:', part1());
console.log('part2:', part2());
