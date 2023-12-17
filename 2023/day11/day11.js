let input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = (expandSize) => {
  let grid = input.split('\n');
  const emptyLine = Array.from({ length: expandSize }, () => '.').join('');
  const rowsToExpand = [];
  const columnsToExpand = [];
  for (let i = 0; i < grid.length; i++) {
    const emptyRow = !grid[i].split('').some((e) => e === '#');

    if (emptyRow && expandSize) {
      rowsToExpand.push(i);
    }
  }
  for (let i = 0; i < grid[0].length; i++) {
    const emptyColumn = grid.reduce((prev, row) => {
      if (row[i] === '#') {
        return false;
      }
      return prev;
    }, true);

    if (emptyColumn && expandSize) {
      columnsToExpand.push(i);
    }
  }
  rowsToExpand.forEach((rowToExpand, index) => {
    grid = [...grid.slice(0, rowToExpand + index), emptyLine, ...grid.slice(rowToExpand + index)];
  });
  columnsToExpand.forEach((columnToExpand, index) => {
    grid = grid.map((line) => {
      return `${line
        .split('')
        .slice(0, columnToExpand + index)
        .join('')}${'.'.repeat(expandSize)}${line
        .split('')
        .slice(columnToExpand + index)
        .join('')}`;
    });
  });
  const galaxies = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') {
        galaxies.push([i, j]);
      }
    }
  }

  const distanceBetweenGalaxies = (a, b) => {
    const x = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

    return x;
  };

  const sum = galaxies.reduce((totalDistance, galaxy, index) => {
    return (
      totalDistance +
      galaxies.slice(index + 1).reduce((distance, galaxy2) => {
        return distance + distanceBetweenGalaxies(galaxy, galaxy2);
      }, 0)
    );
  }, 0);

  return sum;
};
part1(1);
part1(0);

const a = part1(1);
const b = part1(0);
const n = 1_000_000;
const part2 = b + (a - b) * (n - 1);

console.log(a);
console.log(part2);
