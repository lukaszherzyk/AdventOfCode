let input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const isCapital = (c) => {
  return c.charCodeAt() >= 65 && c.charCodeAt() <= 90;
};

const getPriority = (c) => {
  if (isCapital(c)) {
    return c.charCodeAt() - 38;
  }
  return c.charCodeAt() - 96;
};

const findDuplicates = (a, b) => {
  const duplicates = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        duplicates.push(a[i]);
      }
    }
  }

  return [...new Set(duplicates)];
};

const part1 = (input) => {
  return input.split('\n').reduce((acc, line) => {
    const [a, b] = [line.slice(0, line.length / 2), line.slice(line.length / 2)];
    return getPriority(findDuplicates(a, b)[0]) + acc;
  }, 0);
};

const splitEvry3Lines = (input) => {
  const lines = input.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i += 3) {
    result.push([lines[i], lines[i + 1], lines[i + 2]]);
  }
  return result;
};

const part2 = (input) =>
  splitEvry3Lines(input).reduce(
    (acc, [a, b, c]) => getPriority(findDuplicates(findDuplicates(a, b), c)[0]) + acc,
    0
  );

console.log(part1(input));
console.log(part2(input));
