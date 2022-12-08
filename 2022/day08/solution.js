let input = `30373
25512
65332
33549
35390
`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const part1 = (input) => {
  const grid = [];
  input.split('\n').forEach((line, index) => {
    line.split('').forEach((n, nIndex) => {
      grid[index] = grid[index] || [];
      grid[index][nIndex] = Number(n);
    });
  });

  let countVisible = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const current = grid[i][j];
      const left = grid[i].slice(0, j);
      const right = grid[i].slice(j + 1);
      const top = grid.slice(0, i).map((row) => row[j]);
      const bottom = grid.slice(i + 1).map((row) => row[j]);

      if (
        left.every((n) => n < current) ||
        right.every((n) => n < current) ||
        top.every((n) => n < current) ||
        bottom.every((n) => n < current)
      ) {
        countVisible++;
      }
    }
  }
  return countVisible;
};

const part2 = (input) => {
  const grid = [];
  input.split('\n').forEach((line, index) => {
    line.split('').forEach((n, nIndex) => {
      grid[index] = grid[index] || [];
      grid[index][nIndex] = Number(n);
    });
  });

  let countVisible = 0;
  let max = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const scenic = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      const current = grid[i][j];
      const left = grid[i].slice(0, j);
      const right = grid[i].slice(j + 1);
      const top = grid.slice(0, i).map((row) => row[j]);
      const bottom = grid.slice(i + 1).map((row) => row[j]);
      if (
        left.every((n) => n < current) ||
        right.every((n) => n < current) ||
        top.every((n) => n < current) ||
        bottom.every((n) => n < current)
      ) {
        for (let k = left.length - 1; k >= 0; k--) {
          const element = left[k];
          if (element >= current) {
            scenic.left = left.length - k;
            break;
          }
          if (k === 0) {
            scenic.left = left.length;
          }
        }
        for (let k = 0; k < right.length; k++) {
          const element = right[k];

          if (element >= current) {
            scenic.right = k + 1;
            break;
          }
          if (k === right.length - 1) {
            scenic.right = right.length;
          }
        }
        const reversedTop = top.reverse();
        for (let k = 0; k < reversedTop.length; k++) {
          const element = reversedTop[k];

          if (element >= current) {
            scenic.top = k + 1;
            break;
          }
          if (k === reversedTop.length - 1) {
            scenic.top = reversedTop.length;
          }
        }
        for (let k = 0; k < bottom.length; k++) {
          const element = bottom[k];

          if (element >= current) {
            scenic.bottom = k + 1;
            break;
          }
          if (k === bottom.length - 1) {
            scenic.bottom = bottom.length;
          }
        }
        const total = scenic.left * scenic.right * scenic.top * scenic.bottom;
        if (total > max) {
          max = total;
        }

        countVisible++;
      }
    }
  }
  return max;
};
console.log('part1:', part1(input));
console.log('part2:', part2(input));
