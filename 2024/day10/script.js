let input = `0123
1234
8765
9876`;
const { bfsAllPaths, bfsFind } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

const fs = require('fs');
input = fs.readFileSync(__dirname + '/input.txt').toString();

const prettyPrint = (e) => {
  console.log(e.map((el) => el.join(' ')));
};

const canClimb = (currentHeight, destination) =>
  Number(destination) - Number(currentHeight) === 1;

const part1 = () => {
  const map = input.split('\n').map((e) => e.split('')); //.map((e)=> Number));
  const graph = {};
  const starts = [];
  const ends = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const currentHeight = map[y][x];
      if (currentHeight !== '.') {
        const position = `${y}-${x}`;

        if (currentHeight === '0') {
          starts.push(`${y}-${x}`);
        }

        if (currentHeight === '9') {
          ends.push(`${y}-${x}`);
        }

        graph[position] = [];
        // TOPtop
        const top = map[y - 1]?.[x];
        if (top !== undefined && canClimb(currentHeight, top)) {
          graph[position] = [...graph[position], `${y - 1}-${x}`];
        }
        // RIGHT
        const right = map[y]?.[x + 1];
        if (right !== undefined && canClimb(currentHeight, right)) {
          graph[position] = [...graph[position], `${y}-${x + 1}`];
        }
        // BOTTOM
        const bottom = map[y + 1]?.[x];
        if (bottom !== undefined && canClimb(currentHeight, bottom)) {
          graph[position] = [...graph[position], `${y + 1}-${x}`];
        }
        // LEFT
        const left = map[y]?.[x - 1];
        if (left !== undefined && canClimb(currentHeight, left)) {
          graph[position] = [...graph[position], `${y}-${x - 1}`];
        }
      }
    }
  }

  let sum = 0;
  starts.forEach((start) => {
    ends.forEach((end) => {
      const f = bfsFind(graph, start, end);
      if (f) {
        sum++;
      }
    });
  });
  return sum;
};
const part2 = () => {
  const map = input.split('\n').map((e) => e.split('')); //.map((e)=> Number));
  const graph = {};
  const starts = [];
  const ends = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const currentHeight = map[y][x];
      if (currentHeight !== '.') {
        const position = `${y}-${x}`;

        if (currentHeight === '0') {
          starts.push(`${y}-${x}`);
        }

        if (currentHeight === '9') {
          ends.push(`${y}-${x}`);
        }

        graph[position] = [];
        // TOPtop
        const top = map[y - 1]?.[x];
        if (top !== undefined && canClimb(currentHeight, top)) {
          graph[position] = [...graph[position], `${y - 1}-${x}`];
        }
        // RIGHT
        const right = map[y]?.[x + 1];
        if (right !== undefined && canClimb(currentHeight, right)) {
          graph[position] = [...graph[position], `${y}-${x + 1}`];
        }
        // BOTTOM
        const bottom = map[y + 1]?.[x];
        if (bottom !== undefined && canClimb(currentHeight, bottom)) {
          graph[position] = [...graph[position], `${y + 1}-${x}`];
        }
        // LEFT
        const left = map[y]?.[x - 1];
        if (left !== undefined && canClimb(currentHeight, left)) {
          graph[position] = [...graph[position], `${y}-${x - 1}`];
        }
      }
    }
  }

  let sum = 0;
  starts.forEach((start) => {
    ends.forEach((end) => {
      const f = bfsAllPaths(graph, start, end);

      sum += f.length;
    });
  });
  return sum;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
