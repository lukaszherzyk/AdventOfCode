let input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const { permuteWithRepetition } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg
  );
  originalLog.apply(console, args);
};

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const prettyPrint = (e) => {
  console.log(e.map((el) => el.join('')));
};

const part1 = () => {
  return input
    .split('\n')
    .map((el) => {
      const [testValue, numbers] = el.split(': ');
      return {
        testValue: Number(testValue),
        numbers: numbers.split(' ').map(Number)
      };
    })
    .reduce((acc, curr) => {
      const permutations = permuteWithRepetition(
        ['+', '*'],
        curr.numbers.length - 1
      );
      for (let i = 0; i < permutations.length; i++) {
        const perm = permutations[i];
        let total = 0;
        for (let j = 0; j < perm.length; j++) {
          if (j === 0) {
            total = eval(`${curr.numbers[0]}${perm[0]}${curr.numbers[1]}`);
          } else {
            total = eval(`${total}${perm[j]}${curr.numbers[j + 1]}`);
          }
        }
        if (total === curr.testValue) {
          return acc + curr.testValue;
        }
      }
      return acc;
    }, 0);
};

const part2 = () => {
  return input
    .split('\n')
    .map((el) => {
      const [testValue, numbers] = el.split(': ');
      return {
        testValue: Number(testValue),
        numbers: numbers.split(' ').map(Number)
      };
    })
    .reduce((acc, curr) => {
      const permutations = permuteWithRepetition(
        ['+', '*', '||'],
        curr.numbers.length - 1
      );
      for (let i = 0; i < permutations.length; i++) {
        const perm = permutations[i];
        let total = 0;
        for (let j = 0; j < perm.length; j++) {
          const isConcat = perm[j] === '||';
          if (j === 0) {
            if (isConcat) {
              total = eval(`${curr.numbers[0]}${curr.numbers[1]}`);
            } else {
              total = eval(`${curr.numbers[0]}${perm[0]}${curr.numbers[1]}`);
            }
          } else {
            if (isConcat) {
              total = eval(`${total}${curr.numbers[j + 1]}`);
            } else {
              total = eval(`${total}${perm[j]}${curr.numbers[j + 1]}`);
            }
          }
        }
        if (total === curr.testValue) {
          return acc + curr.testValue;
        }
      }
      return acc;
    }, 0);
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
