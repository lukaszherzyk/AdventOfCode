//prettier-ignore
let input =
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
// columns <-
// rows ^ * 100
// input = require('fs')
//   .readFileSync(__dirname + '/input.txt')
//   .toString();
const transpose = (arr) =>
  JSON.parse(JSON.stringify(arr))[0].map((_col, i) => arr.map((row) => row[i]));

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

console.log(part1());
