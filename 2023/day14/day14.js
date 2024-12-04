// prettier-ignore
let input = 
`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

//input = require('fs')
//  .readFileSync(__dirname + '/input.txt')
//  .toString();

const format = (a) => a.map((e) => e.join('')).join('\n');

const rotate = (matrix) => matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
getLoad = (g) => {
  const grid = g.split('\n').map((e) => e.split(''));
  let total = 0;
  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const el = grid[j][i];
      if (el === 'O') {
        total += grid.length - j;
      }
    }
  }
  return total;
};
const part2 = () => {
  let grid = input.split('\n').map((e) => e.split(''));

  const cycle = () => {
    for (let k = 0; k < 4; k++) {
      for (let i = 0; i < grid[0].length; i++) {
        let load = grid.length;
        for (let j = 0; j < grid.length; j++) {
          const el = grid[j][i];
          if (el === 'O') {
            grid[j][i] = '.';
            load--;
            grid[grid.length - load - 1][i] = 'O';
          }
          if (el === '#') {
            load = grid.length - j - 1;
          }
        }
      }
      grid = rotate(grid);
    }
  };

  const gridCache = [];
  let iter = 0;
  while (true) {
    iter += 1;
    total = 0;
    cycle();
    const formattedGrid = format(grid);
    if (gridCache.includes(formattedGrid)) {
      // const cycleStart = gridCache.indexOf(formattedGrid);
      // console.log({ iter, cycleStart, 'iter - cycleStart': iter - cycleStart });
      // // prettier-ignore
      // const g =   gridCache[(1_000_000_000 - cycleStart) % (iter - cycleStart)+ cycleStart];
      // // console.log('total ->>', getLoad(g));
      // gridCache.forEach((e) => {
      //   console.log(getLoad(e));
      // });
      // console.log('return');
      // return getLoad(g);
    }

    gridCache.push(formattedGrid);

    if (iter === 2000) {
      break;
    }
  }
  gridCache.forEach((e) => {
    console.log(getLoad(e));
  });
  console.log('gridCache length', gridCache.length);
  return total;
};

const part1 = (gridString) => {
  const grid = gridString.split('\n').map((e) => e.split(''));
  let total = 0;
  for (let i = 0; i < grid[0].length; i++) {
    let load = grid.length;
    for (let j = 0; j < grid.length; j++) {
      const el = grid[j][i];
      if (el === 'O') {
        total += load;
        load--;
      }
      if (el === '#') {
        load = grid.length - j - 1;
      }
    }
  }
  return total;
};
//console.log('part1', part1());
console.log(part2(input));
// 112773 too high
// 106853 too high

//  98874 too low
