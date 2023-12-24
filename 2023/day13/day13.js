input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const transpose = (arr) =>
  JSON.parse(JSON.stringify(arr))[0].map((_col, i) => arr.map((row) => row[i]));

const countMismatch = (a, b) => {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      count++;
    }
  }
  return count;
};

const findHorizontalReflection = (grid, vertical) => {
  for (let i = 0; i < grid.length - 1; i++) {
    if (grid[i].join('') === grid[i + 1].join('')) {
      const top = grid.slice(0, i).reverse();
      const bottom = grid.slice(i + 2);
      let ok = true;
      for (let k = 0; k < Math.min(top.length, bottom.length); k++) {
        if (top[k].join('') !== bottom[k].join('')) {
          ok = false;
        }
      }
      if (ok) {
        return (1 + top.length) * (vertical ? 1 : 100);
      }
    }
  }
  return 0;
};
const part1 = () => {
  return input
    .split('\n\n')
    .map((grid) => {
      return grid.split('\n').map((e) => e.split(''));
    })
    .reduce((sum, grid) => {
      const v =
        findHorizontalReflection(transpose(grid), true) + findHorizontalReflection(grid, false);

      return sum + v;
    }, 0);
};

const findHorizontalReflection2 = (grid, vertical) => {
  for (let i = 0; i < grid.length - 1; i++) {
    let allMismatch = countMismatch(grid[i], grid[i + 1]);
    if (allMismatch < 2) {
      const top = grid.slice(0, i).reverse();
      const bottom = grid.slice(i + 2);
      let matchedReflection = true;
      for (let k = 0; k < Math.min(top.length, bottom.length); k++) {
        allMismatch += countMismatch(top[k], bottom[k]);
        if (matchedReflection && allMismatch > 2) {
          matchedReflection = false;
        }
      }
      if (matchedReflection && allMismatch === 1) {
        allMismatch === 0 && console.log(1 + top.length) * (vertical ? 1 : 100);
        return (1 + top.length) * (vertical ? 1 : 100);
      }
    }
  }
  return 0;
};
const part2 = () => {
  return input
    .split('\n\n')
    .map((grid) => {
      return grid.split('\n').map((e) => e.split(''));
    })
    .reduce((sum, grid) => {
      const v =
        findHorizontalReflection2(transpose(grid), true) + findHorizontalReflection2(grid, false);

      return sum + v;
    }, 0);
};
console.log(part1());

console.log(part2());
