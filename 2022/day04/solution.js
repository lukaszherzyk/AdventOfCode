let input = `2-4,6-8
 2-3,4-5
 5-7,7-9
 2-8,3-7
 6-6,4-6
 2-6,4-8`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const part1 = () => {
  const getStartEnd = (assignments) => {
    return { start: Number(assignments.split('-')[0]), end: Number(assignments.split('-')[1]) };
  };

  const isSame = (a, b) => {
    return a.start === b.start && a.end === b.end;
  };
  return input
    .split('\n')
    .map((line) => {
      const [a, b] = line.split(',');
      return [getStartEnd(a), getStartEnd(b)].sort((a, b) => a.start - b.start);
    })
    .reduce((acc, curr) => {
      const [a, b] = curr;
      const aLength = a.end - a.start + 1;
      const bLength = b.end - b.start + 1;
      if (aLength === bLength && isSame(a, b)) {
        return acc + 1;
      }
      if (aLength > bLength && a.start <= b.start && a.end >= b.end) {
        return acc + 1;
      }
      if (bLength > aLength && b.start <= a.start && b.end >= a.end) {
        return acc + 1;
      }
      return acc;
    }, 0);
};

const part2 = () => {
  const getStartEnd = (assignments) => {
    return { start: Number(assignments.split('-')[0]), end: Number(assignments.split('-')[1]) };
  };

  const isSame = (a, b) => {
    return a.start === b.start && a.end === b.end;
  };
  return input
    .split('\n')
    .map((line) => {
      const [a, b] = line.split(',');
      return [getStartEnd(a), getStartEnd(b)].sort((a, b) => a.start - b.start);
    })
    .reduce((acc, curr) => {
      const [a, b] = curr;
      const aLength = a.end - a.start + 1;
      const bLength = b.end - b.start + 1;
      if (aLength === bLength && isSame(a, b)) {
        return acc + 1;
      }
      if (a.end >= b.start) {
        return acc + 1;
      }
      return acc;
    }, 0);
};
console.log('part1:', part1());
console.log('part2:', part2());
