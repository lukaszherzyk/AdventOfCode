let input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

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

const part1 = () => {
  const parsed = input.split('\n\n');

  const orderingMap = {};
  parsed[0]
    .split('\n')
    .map((el) => el.split('|'))
    .forEach((el) => {
      if (orderingMap[el[0]]) {
        orderingMap[el[0]].after.push(el[1]);
      } else {
        orderingMap[el[0]] = { after: [el[1]] };
      }
    });

  const isOrderCorrect = (el) => {
    for (let i = 0; i < el.length; i++) {
      if (
        orderingMap[el[i]] &&
        el.slice(0, i).some((r) => orderingMap[el[i]].after.includes(r))
      ) {
        return false;
      }
    }
    return true;
  };

  let sum = 0;
  const updates = parsed[1]
    .split('\n')
    .map((el) => el.split(','))
    .forEach((el) => {
      if (isOrderCorrect(el)) {
        sum += Number(el.slice(el.length / 2)[0]);
      }
    });

  return sum;
};

const part2 = () => {
  const parsed = input.split('\n\n');

  const orderingMap = {};
  parsed[0]
    .split('\n')
    .map((el) => el.split('|'))
    .forEach((el) => {
      if (orderingMap[el[0]]) {
        orderingMap[el[0]].after.push(el[1]);
      } else {
        orderingMap[el[0]] = { after: [el[1]] };
      }
    });

  const correctOrder = (el) => {
    const copy = [...el];

    return copy.sort((a, b) => {
      const m = orderingMap[a];
      if (m) {
        return m.after.includes(b) ? -1 : 1;
      }
      return 0;
    });
  };

  const isOrderCorrect = (el) => {
    for (let i = 0; i < el.length; i++) {
      if (
        orderingMap[el[i]] &&
        el.slice(0, i).some((r) => orderingMap[el[i]].after.includes(r))
      ) {
        return false;
      }
    }
    return true;
  };

  let sum = 0;
  const updates = parsed[1]
    .split('\n')
    .map((el) => el.split(','))
    .forEach((el) => {
      if (!isOrderCorrect(el)) {
        const correct = correctOrder(el);
        sum += Number(correct.slice(correct.length / 2)[0]);
      } else {
      }
    });

  return sum;
};

console.log(part1());

console.log(part2());
