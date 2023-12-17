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

const part1 = () => {
  let grid = input.split('\n');
  const emptyLine = Array.from({ length: grid[0].length }, () => '.').join('');
  const rowsToExpand = [];
  const columnsToExpand = [];
  for (let i = 0; i < grid.length; i++) {
    const emptyRow = !grid[i].split('').some((e) => e === '#');

    if (emptyRow) {
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

    if (emptyColumn) {
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
        .join('')}.${line
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
  console.log('galaxies', galaxies.length);
  console.log('sum', sum);
};
part1();
