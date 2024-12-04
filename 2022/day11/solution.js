let input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const solution = (input) => {
  const monkeys = input.split('\n\n').map((line) => {
    const x = line.split('\n');
    const items = x[1].split(': ')[1].split(', ').map(Number);
    const operation = x[2].split(': ')[1].split(' = ')[1];
    const test = +x[3].split(': ')[1].split(' by ')[1];
    const ifTrue = +x[4].split(': ')[1].split(' to monkey ')[1];
    const ifFalse = +x[5].split(': ')[1].split(' to monkey ')[1];

    return { items, operation, test, ifTrue, ifFalse };
  });
  let round = 0;
  const numberOfInspected = [];
  while (round < 20) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, operation, test, ifTrue, ifFalse } = monkeys[i];
      if (items.length === 0) {
        continue;
      }
      while (items.length > 0) {
        numberOfInspected[i] = numberOfInspected[i] ? numberOfInspected[i] + 1 : 1;
        const item = items.shift();
        const newItem = Math.floor(eval(operation.replaceAll('old', item)) / 3);
        if (newItem % test === 0) {
          monkeys[ifTrue].items.push(newItem);
        } else {
          monkeys[ifFalse].items.push(newItem);
        }
      }
    }

    round++;
  }

  return numberOfInspected
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
};

const solution2 = (input) => {
  const monkeys = input.split('\n\n').map((line) => {
    const x = line.split('\n');
    const items = x[1].split(': ')[1].split(', ').map(Number);
    const operation = x[2].split(': ')[1].split(' = ')[1];
    const test = +x[3].split(': ')[1].split(' by ')[1];
    const ifTrue = +x[4].split(': ')[1].split(' to monkey ')[1];
    const ifFalse = +x[5].split(': ')[1].split(' to monkey ')[1];

    return { items, operation, test, ifTrue, ifFalse };
  });
  const productOfAllDivisors = monkeys.reduce((acc, curr) => {
    return acc * curr.test;
  }, 1);
  let round = 0;
  const numberOfInspected = [];
  while (round < 10000) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, operation, test, ifTrue, ifFalse } = monkeys[i];
      if (items.length === 0) {
        continue;
      }
      while (items.length > 0) {
        numberOfInspected[i] = numberOfInspected[i] ? numberOfInspected[i] + 1 : 1;
        const item = items.shift();
        const newItem = eval(operation.replaceAll('old', item)) % productOfAllDivisors;
        if (newItem % test === 0) {
          monkeys[ifTrue].items.push(newItem);
        } else {
          monkeys[ifFalse].items.push(newItem);
        }
      }
    }

    round++;
  }
  return numberOfInspected
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
};
console.log('part 1:', solution(input));
console.log('part 2:', solution2(input));
