let input = `467....10
........*2
..35......
......#...
617*......
.....+.58.
..592.....
......755.
...$......
.664.598..`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  const grid = input.split('\n').map((e) => e.split(''));
  const numbers = [];
  for (let i = 0; i < grid.length; i++) {
    let n = { value: '', neighbors: [] };
    for (let j = 0; j < grid[i].length; j++) {
      const element = grid[i][j];
      if (!isNaN(Number(element))) {
        n.value += element;

        const neighbors = [
          grid[i]?.[j - 1],
          grid[i - 1]?.[j - 1],
          grid[i - 1]?.[j],
          grid[i - 1]?.[j + 1],
          grid[i]?.[j + 1],
          grid[i + 1]?.[j + 1],
          grid[i + 1]?.[j],
          grid[i + 1]?.[j - 1]
        ];
        n.neighbors.push(...neighbors);
      } else {
        if (n.value) {
          numbers.push({ number: Number(n.value), neighbors: [...n.neighbors] });
        }
        n = { value: '', neighbors: [] };
      }
    }
    if (n.value) {
      numbers.push({ number: Number(n.value), neighbors: [...n.neighbors] });
    }
    n = { value: '', neighbors: [] };
  }
  let a = [];
  const e = numbers.reduce((prev, curr) => {
    return curr.neighbors.filter(
      (e) => !['.', undefined, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e)
    ).length
      ? prev + curr.number
      : prev;
  }, 0);

  return e;
};

console.log(part1());

const findPartNumber = (gear, grid) => {
  const { i, j } = gear;
  const parts = [];
  if (Number.isInteger(+grid[i]?.[j - 1])) {
    let n = '';
    n = grid[i]?.[j - 1] + n;
    if (Number.isInteger(+grid[i]?.[j - 2])) {
      n = grid[i]?.[j - 2] + n;
      if (Number.isInteger(+grid[i]?.[j - 3])) {
        n = grid[i]?.[j - 3] + n;
      }
    }
    parts.push(Number(n));
  }

  if (Number.isInteger(+grid[i]?.[j + 1])) {
    let n = '';
    n += grid[i]?.[j + 1];
    if (Number.isInteger(+grid[i]?.[j + 2])) {
      n += grid[i]?.[j + 2];
      if (Number.isInteger(+grid[i]?.[j + 3])) {
        n += grid[i]?.[j + 3];
      }
    }
    parts.push(Number(n));
  }

  if (grid[i - 1]) {
    let lookBack = 0;
    if (Number.isInteger(+grid[i - 1]?.[j - 1])) {
      lookBack++;
      if (Number.isInteger(+grid[i - 1]?.[j - 2])) {
        lookBack++;
        if (Number.isInteger(+grid[i - 1]?.[j - 3])) {
          lookBack++;
        }
      }
    }
    let lookForward = 1;
    if (Number.isInteger(+grid[i - 1]?.[j + 1])) {
      lookForward++;
      if (Number.isInteger(+grid[i - 1]?.[j + 2])) {
        lookForward++;
        if (Number.isInteger(+grid[i - 1]?.[j + 3])) {
          lookForward++;
        }
      }
    }

    const str = grid[i - 1].slice(Math.max(j - lookBack, 0), j + lookForward);

    parts.push(...[...str.join('').matchAll(/\d+/g)].map((e) => Number(e[0])));
  }

  if (grid[i + 1]) {
    let lookBack = 1;
    if (Number.isInteger(+grid[i + 1]?.[j - 1])) {
      lookBack++;
      if (Number.isInteger(+grid[i + 1]?.[j - 2])) {
        lookBack++;
        if (Number.isInteger(+grid[i + 1]?.[j - 3])) {
          lookBack++;
        }
      }
    }
    let lookForward = 1;
    if (Number.isInteger(+grid[i + 1]?.[j + 1])) {
      lookForward++;
      if (Number.isInteger(+grid[i + 1]?.[j + 2])) {
        lookForward++;
        if (Number.isInteger(+grid[i + 1]?.[j + 3])) {
          lookForward++;
        }
      }
    }

    const str = grid[i + 1].slice(Math.max(j - lookBack, 0), j + lookForward);
    parts.push(...[...str.join('').matchAll(/\d+/g)].map((e) => Number(e[0])));
  }

  if (parts.length === 2) {
    return parts[0] * parts[1];
  }
  return 0;
};

const part2 = () => {
  const grid = input.split('\n').map((e) => e.split(''));
  let total = 0;
  let c = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '*') {
        total += findPartNumber({ i, j }, grid);
      }
    }
  }
  return total;
};
const c = input.split('').reduce((prev, curr) => {
  return curr === '*' ? prev + 1 : prev;
}, 0);

console.log(part2());
