let input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const { permuteWithRepetition, perf } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const prettyPrint = (e) => {
  console.log(e.map((el) => el.join(' ')));
};

const part1 = () => {
  const cords = {};
  const map = input.split('\n').map((el) => el.split(''));
  const antinodes = input.split('\n').map((el) => el.split(''));
  const maxY = map.length - 1;
  const maxX = map[0].length - 1;

  map.forEach((row, i) => {
    row.forEach((e, j) => {
      if (e !== '.') {
        if (cords[e]) {
          cords[e] = [...cords[e], { x: j, y: i }];
        } else {
          cords[e] = [{ x: j, y: i }];
        }
      }
    });
  });

  let counter = 0;
  for (const [key, values] of Object.entries(cords)) {
    values.forEach((a) => {
      values.forEach((b) => {
        const aX = a.x;
        const aY = a.y;
        const bX = b.x;
        const bY = b.y;
        const xDistance = Math.abs(aX - bX);
        const yDistance = Math.abs(aY - bY);
        if (xDistance !== 0 || yDistance !== 0) {
          const y = aY > bY ? aY + yDistance : aY - yDistance;
          const x = aX > bX ? aX + xDistance : aX - xDistance;
          if (x >= 0 && y >= 0 && y <= maxY && x <= maxX) {
            if (antinodes[y][x] !== '#') {
              counter++;
            }
            antinodes[y][x] = '#';
          }
        }
      });
    });
  }

  return counter;
};

const part2 = () => {
  const cords = {};
  const map = input.split('\n').map((el) => el.split(''));
  const antinodes = input.split('\n').map((el) => el.split(''));
  const maxY = map.length - 1;
  const maxX = map[0].length - 1;

  map.forEach((row, i) => {
    row.forEach((e, j) => {
      if (e !== '.') {
        if (cords[e]) {
          cords[e] = [...cords[e], { x: j, y: i }];
        } else {
          cords[e] = [{ x: j, y: i }];
        }
      }
    });
  });

  let counter = 0;
  for (const [key, values] of Object.entries(cords)) {
    values.forEach((a) => {
      counter += 1;
      values.forEach((b) => {
        let aX = a.x;
        let aY = a.y;
        let bX = b.x;
        let bY = b.y;
        while (true) {
          const xDistance = Math.abs(aX - bX);
          const yDistance = Math.abs(aY - bY);
          if (xDistance !== 0 || yDistance !== 0) {
            const y = aY > bY ? aY + yDistance : aY - yDistance;
            const x = aX > bX ? aX + xDistance : aX - xDistance;
            if (x >= 0 && y >= 0 && y <= maxY && x <= maxX) {
              if (map[y][x] === '.' && antinodes[y][x] !== '#') {
                counter++;
                antinodes[y][x] = '#';
              }
            } else {
              break;
            }

            bX = aX;
            bY = aY;
            aX = x;
            aY = y;
          } else {
            break;
          }
        }
      });
    });
  }

  return counter;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
