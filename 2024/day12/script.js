let input = `AAAA
BBCD
BBCC
EEEC`;

const { prettyPrintGrid } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

const fs = require('fs');
input = fs.readFileSync(__dirname + '/input.txt').toString();

const isSame = (a, b) => a === b;

const bfs = (graph, start, cb) => {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();

    if (!visited.has(node)) {
      visited.add(node);
      const neighbors = graph[node];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          cb(node, neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  return null;
};

const part1 = () => {
  const map = input.split('\n').map((e) => e.split(''));
  const graph = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const plant = map[y]?.[x];
      const top = { plant: map[y - 1]?.[x], key: `${y - 1}-${x}` };
      const right = { plant: map[y]?.[x + 1], key: `${y}-${x + 1}` };
      const bottom = { plant: map[y + 1]?.[x], key: `${y + 1}-${x}` };
      const left = { plant: map[y]?.[x - 1], key: `${y}-${x - 1}` };
      const key = `${y}-${x}`;

      const neighbours = [];

      [top, right, bottom, left].forEach((neighbour) => {
        if (neighbour.plant && isSame(plant, neighbour.plant)) {
          neighbours.push(neighbour.key);
        }
      });
      graph[key] = graph[key] ?? [];
      graph[key] = [...graph[key], ...neighbours];
    }
  }

  const visited = {};

  let totalCost = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const key = `${y}-${x}`;
      const plant = map[y][x];
      if (!visited[key]) {
        let area = 1;
        let perimeter = 4 - graph[key].length;
        visited[key] = true;
        bfs(graph, key, (node, neighbor) => {
          if (!visited[neighbor]) {
            perimeter += 4 - graph[neighbor].length;
            area++;
            visited[neighbor] = true;
          }
        });
        totalCost += area * perimeter;
      }
    }
  }
  return totalCost;
};
const part2 = () => {
  const map = input.split('\n').map((e) => e.split(''));
  const graph = {};
  const plants = [];
  const areas = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const plant = map[y]?.[x];
      if (!areas[plant]) {
        areas[plant] = 1;
      } else {
        areas[plant] = areas[plant] + 1;
      }
      if (!plants.includes(plant)) {
        plants.push(plant);
      }
      const top = { plant: map[y - 1]?.[x], key: `${y - 1}-${x}` };
      const right = { plant: map[y]?.[x + 1], key: `${y}-${x + 1}` };
      const bottom = { plant: map[y + 1]?.[x], key: `${y + 1}-${x}` };
      const left = { plant: map[y]?.[x - 1], key: `${y}-${x - 1}` };
      const key = `${y}-${x}`;

      const neighbours = [];

      [top, right, bottom, left].forEach((neighbour) => {
        if (neighbour.plant && isSame(plant, neighbour.plant)) {
          neighbours.push(neighbour.key);
        }
      });
      graph[key] = graph[key] ?? [];
      graph[key] = [...graph[key], ...neighbours];
    }
  }
  /*

A -  4 16
B -  4 16
C -  8 32
D -  4  4 
E -  4 12

*/
  let totalCost = 0;
  const calculateSides = (toCheck, plant) => {
    const map = input.split('\n').map((e) => e.split(''));
    toCheck.forEach(({ x, y }) => {
      map[y][x] = '@';
    });

    let totalSides = 0;

    const calcSides = (arr) => {
      const result = arr
        .join('')
        .replaceAll(/-+/g, '-')
        .split('-')
        .filter(Boolean).length;
      return result;
    };

    ['@'].forEach((plant) => {
      //LEFT
      let left = [];
      let totalLeftSides = 0;
      for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
          const current = map[y][x];

          const prev = map[y]?.[x - 1];
          if (current !== plant) {
            left.push('-');
          } else {
            if (prev !== plant) {
              left.push(current);
            } else {
              left.push('-');
            }
          }
        }
        const leftSides = calcSides(left);
        totalLeftSides += leftSides;

        left.length = 0;
      }
      // RIGHT
      let right = [];
      let totalRigthSides = 0;
      for (let x = map[0].length - 1; x >= 0; x--) {
        for (let y = 0; y < map.length; y++) {
          const current = map[y][x];

          const prev = map[y]?.[x + 1];
          if (current !== plant) {
            right.push('-');
          } else {
            if (prev !== plant) {
              right.push(current);
            } else {
              right.push('-');
            }
          }
        }
        const rightSides = calcSides(right);

        totalRigthSides += rightSides;

        right.length = 0;
      }

      // TOP
      let top = [];
      let totalTopSides = 0;
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          const current = map[y][x];

          const prev = map[y - 1]?.[x];
          if (current !== plant) {
            top.push('-');
          } else {
            if (prev !== plant) {
              top.push(current);
            } else {
              top.push('-');
            }
          }
        }
        const topSides = calcSides(top);
        totalTopSides += topSides;

        top.length = 0;
      }
      // BOTTOM
      let bottom = [];
      let totalBottomSides = 0;
      for (let y = map.length - 1; y >= 0; y--) {
        for (let x = 0; x < map[0].length; x++) {
          const current = map[y][x];

          const prev = map[y + 1]?.[x];
          if (current !== plant) {
            bottom.push('-');
          } else {
            if (prev !== plant) {
              bottom.push(current);
            } else {
              bottom.push('-');
            }
          }
        }
        const bottomSides = calcSides(bottom);
        totalBottomSides += bottomSides;

        bottom.length = 0;
      }

      totalSides =
        totalLeftSides + totalRigthSides + totalTopSides + totalBottomSides;
    });
    return totalSides;
  };

  const visited = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const key = `${y}-${x}`;
      const plant = map[y][x];
      if (!visited[key]) {
        let area = 1;
        let perimeter = 4 - graph[key].length;
        visited[key] = true;
        const toCheck = [{ y, x }];
        bfs(graph, key, (node, neighbor) => {
          if (!visited[neighbor]) {
            const [neighborY, neighborX] = neighbor.split('-').map(Number);
            toCheck.push({ y: neighborY, x: neighborX });
            perimeter += 4 - graph[neighbor].length;
            area++;
            visited[neighbor] = true;
          }
        });
        const regionSides = calculateSides(toCheck, plant);
        totalCost += area * regionSides;
      }
    }
  }
  return totalCost;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
