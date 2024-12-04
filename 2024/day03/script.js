let input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const mulRegex = /mul\(\d+,\d+\)/g;
const dontRegex = /don\'t\(\)/g;
const doRegex = /do\(\)/g;

const part1 = () => {
  return [...input.matchAll(mulRegex)].reduce((acc, curr) => {
    const [a, b] = [...curr.matchAll(/\d+/g)].map((e) => Number(e[0]));
    return acc + a * b;
  }, 0);
};

const part2 = () => {
  const d = [...input.matchAll(doRegex)];
  const dont = [...input.matchAll(dontRegex)];
  const mul = [...input.matchAll(mulRegex)];

  return [...d, ...dont, ...mul]
    .sort((a, b) => a.index - b.index)
    .map((el) => el[0])
    .reduce(
      (prev, curr) => {
        if (curr === "don't()") {
          return { ...prev, proceed: false };
        }
        if (curr === 'do()') {
          return { ...prev, proceed: true };
        }
        if (prev.proceed) {
          const [a, b] = [...curr.matchAll(/\d+/g)].map((e) => Number(e[0]));
          return { sum: prev.sum + a * b, proceed: true };
        }
        return prev;
      },
      { sum: 0, proceed: true }
    ).sum;
};

console.log(part1());
console.log(part2());
