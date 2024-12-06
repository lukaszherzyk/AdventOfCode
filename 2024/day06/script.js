let input = `....#.....
.........#
..........
..#.......
....#..#..
.....#....
.#.#^.....
........#.
#..#......
....#.#...`;

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

const getGuardPos = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '^') {
        return { y: i, x: j };
      }
    }
  }
};

const prettyPrint = (e) => {
  console.log(e.map((el) => el.join('')));
};

const part1 = () => {
  const map = input.split('\n').map((el) => el.split(''));
  const dirs = ['up', 'right', 'down', 'left'];
  let dir = 'up';
  const guardPos = getGuardPos(map);

  const visited = new Map();
  visited.set(`${guardPos.x}-${guardPos.y}`);

  while (true) {
    if (dir === 'up') {
      while (true) {
        let y = guardPos.y - 1;
        const p = map[y]?.[guardPos.x];

        if (!p) {
          return visited.size;
        }

        if (p === '.') {
          map[guardPos.y][guardPos.x] = '.';
          guardPos.y -= 1;
          map[guardPos.y][guardPos.x] = '^';
          visited.set(`${guardPos.x}-${guardPos.y}`);
        }
        if (p === '#') {
          dir = dirs[(dirs.indexOf(dir) + 1) % 4];
          break;
        }
      }
    }
    if (dir === 'right') {
      while (true) {
        let x = guardPos.x + 1;
        const p = map[guardPos.y]?.[x];

        if (!p) {
          return visited.size;
        }

        if (p === '.') {
          map[guardPos.y][guardPos.x] = '.';
          guardPos.x += 1;
          map[guardPos.y][guardPos.x] = '^';
          visited.set(`${guardPos.x}-${guardPos.y}`);
        }
        if (p === '#') {
          dir = dirs[(dirs.indexOf(dir) + 1) % 4];
          break;
        }
      }
    }
    if (dir === 'down') {
      while (true) {
        let y = guardPos.y + 1;
        const p = map[y]?.[guardPos.x];

        if (!p) {
          return visited.size;
        }

        if (p === '.') {
          map[guardPos.y][guardPos.x] = '.';
          guardPos.y += 1;
          map[guardPos.y][guardPos.x] = '^';
          visited.set(`${guardPos.x}-${guardPos.y}`);
        }
        if (p === '#') {
          dir = dirs[(dirs.indexOf(dir) + 1) % 4];
          break;
        }
      }
    }
    if (dir === 'left') {
      while (true) {
        let x = guardPos.x - 1;
        const p = map[guardPos.y]?.[x];

        if (!p) {
          return visited.size;
        }

        if (p === '.') {
          map[guardPos.y][guardPos.x] = '.';
          guardPos.x -= 1;
          map[guardPos.y][guardPos.x] = '^';
          visited.set(`${guardPos.x}-${guardPos.y}`);
        }
        if (p === '#') {
          dir = dirs[(dirs.indexOf(dir) + 1) % 4];
          break;
        }
      }
    }
  }
};

const part2 = () => {
  const visited = new Map();

  const total = (addToVisited, map) => {
    const dirs = ['up', 'right', 'down', 'left'];
    let dir = 'up';
    const guardPos = getGuardPos(map);
    let iter = 0;

    while (true) {
      iter++;
      if (iter === 40) {
        return 'loop';
      }
      if (dir === 'up') {
        while (true) {
          let y = guardPos.y - 1;
          const p = map[y]?.[guardPos.x];

          if (!p) {
            return visited.size;
          }

          if (p === '.') {
            map[guardPos.y][guardPos.x] = '.';
            guardPos.y -= 1;
            map[guardPos.y][guardPos.x] = '^';
            addToVisited &&
              visited.set(`${guardPos.x}-${guardPos.y}`, {
                x: guardPos.x,
                y: guardPos.y
              });
          }
          if (p === '#') {
            dir = dirs[(dirs.indexOf(dir) + 1) % 4];
            break;
          }
        }
      }
      if (dir === 'right') {
        while (true) {
          let x = guardPos.x + 1;
          const p = map[guardPos.y]?.[x];

          if (!p) {
            return visited.size;
          }

          if (p === '.') {
            map[guardPos.y][guardPos.x] = '.';
            guardPos.x += 1;
            map[guardPos.y][guardPos.x] = '^';
            addToVisited &&
              visited.set(`${guardPos.x}-${guardPos.y}`, {
                x: guardPos.x,
                y: guardPos.y
              });
          }
          if (p === '#') {
            dir = dirs[(dirs.indexOf(dir) + 1) % 4];
            break;
          }
        }
      }
      if (dir === 'down') {
        while (true) {
          let y = guardPos.y + 1;
          const p = map[y]?.[guardPos.x];

          if (!p) {
            return visited.size;
          }

          if (p === '.') {
            map[guardPos.y][guardPos.x] = '.';
            guardPos.y += 1;
            map[guardPos.y][guardPos.x] = '^';
            addToVisited &&
              visited.set(`${guardPos.x}-${guardPos.y}`, {
                x: guardPos.x,
                y: guardPos.y
              });
          }
          if (p === '#') {
            dir = dirs[(dirs.indexOf(dir) + 1) % 4];
            break;
          }
        }
      }
      if (dir === 'left') {
        while (true) {
          let x = guardPos.x - 1;
          const p = map[guardPos.y]?.[x];

          if (!p) {
            return visited.size;
          }

          if (p === '.') {
            map[guardPos.y][guardPos.x] = '.';
            guardPos.x -= 1;
            map[guardPos.y][guardPos.x] = '^';
            addToVisited &&
              visited.set(`${guardPos.x}-${guardPos.y}`, {
                x: guardPos.x,
                y: guardPos.y
              });
          }
          if (p === '#') {
            dir = dirs[(dirs.indexOf(dir) + 1) % 4];
            break;
          }
        }
      }
    }
  };

  total(
    true,
    input.split('\n').map((el) => el.split(''))
  );
  let loops = 0;
  const map = input.split('\n').map((el) => el.split(''));
  const startingGuardPos = getGuardPos(map);

  visited.delete(`${startingGuardPos.x}-${startingGuardPos.y}`);

  for (let [_, value] of visited) {
    const map = input.split('\n').map((el) => el.split(''));
    map[value.y][value.x] = '#';

    if (total(false, map) === 'loop') {
      loops++;
    }
  }
  return loops;
};
console.log(part1());

console.log(part2());
