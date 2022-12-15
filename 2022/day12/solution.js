let input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

class Node {
  constructor(value) {
    this.isStart = value === 'S';
    this.isEnd = value === 'E';
    this.value = value === 'S' ? 1 : value === 'E' ? 26 : value.charCodeAt(0) - 96;
    this.children = [];
  }
  addChild(node) {
    if (!this.children.includes(node) && this.value >= node.value - 1) {
      this.children.push(node);
    }
  }
}
const dijkstra = (start, end, allNodes) => {
  allNodes.forEach((node) => {
    node.distance = Infinity;
  });
  const visited = [];
  let unvisited = allNodes;
  start.distance = 0;

  const findSmallest = () => {
    let smallest = null;
    unvisited.forEach((node) => {
      if (smallest === null || node.distance < smallest.distance) {
        smallest = node;
      }
    });
    return smallest;
  };

  while (unvisited.length > 0) {
    let smallest = findSmallest();

    unvisited = unvisited.filter((node) => node !== smallest);
    visited.push(smallest);

    smallest.children.forEach((child) => {
      const distance = smallest.distance + 1;
      if (distance < child.distance) {
        child.distance = distance;
      }
    });
  }

  return end.distance;
};
const solution = (input) => {
  let start = null;
  let end = null;
  const lines = input.split('\n').map((line) =>
    line.split('').map((e) => {
      const node = new Node(e);
      if (e === 'S') {
        start = node;
      }
      if (e === 'E') {
        end = node;
      }
      return node;
    })
  );
  const nodes = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const node = lines[i][j];
      if (i > 0) {
        node.addChild(lines[i - 1][j]);
      }
      if (i < lines.length - 1) {
        node.addChild(lines[i + 1][j]);
      }
      if (j > 0) {
        node.addChild(lines[i][j - 1]);
      }
      if (j < lines[i].length - 1) {
        node.addChild(lines[i][j + 1]);
      }
      nodes.push(node);
    }
  }
  console.log('part 1:', dijkstra(start, end, nodes));

  const part2 = nodes
    .filter((node) => node.value === 1)
    .reduce((fewestSteps, node) => {
      const steps = dijkstra(node, end, nodes);
      if (steps < fewestSteps) {
        return steps;
      }
      return fewestSteps;
    }, Infinity);
  // 400s 522
  console.log('part 2:', part2);
};

solution(input);
