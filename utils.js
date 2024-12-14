const { performance } = require('perf_hooks');

const perf = (fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`elapsed: ${end - start}ms`);
};

const lcm = (arr) => {
  const gcd = (x, y) => (y ? gcd(y, x % y) : x);
  return [...arr].reduce((a, b) => (a * b) / gcd(a, b));
};

const permuteWithRepetition = (arr, length) => {
  if (length === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];
  const smallerPermutations = permuteWithRepetition(arr, length - 1);

  arr.forEach((el) => {
    smallerPermutations.forEach((smallerPerm) => {
      result.push([el, ...smallerPerm]);
    });
  });

  return result;
};

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

const bfsFind = (graph, start, target) => {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === target) {
      return node;
    }
    if (!visited.has(node)) {
      visited.add(node);
      const neighbors = graph[node];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return null;
};

const bfsAllPaths = (graph, start, end) => {
  const queue = [[start]];
  const paths = [];

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === end) {
      paths.push(path);
    } else {
      for (const neighbor of graph[node]) {
        if (!path.includes(neighbor)) {
          queue.push([...path, neighbor]);
        }
      }
    }
  }

  return paths;
};

// ============= bfsAllPaths
// const graph = {
//   A: ['B', 'C'],
//   B: ['D'],
//   C: ['D'],
//   D: []
// };

// console.log(bfsAllPaths(graph, 'A', 'D'));

// ============= bfsFind
// const graph = {
//   A: ['B', 'C'],
//   B: ['D', 'E'],
//   C: ['F'],
//   D: [],
//   E: ['F'],
//   F: []
// };

// const startNode = 'A';
// const targetValue = 'E';

// const result = bfsFind(graph, startNode, targetValue);
// console.log(result); //  'E'

// ============= dijkstra
// const nodeA = { name: 'A', children: [] };
// const nodeB = { name: 'B', children: [] };
// const nodeC = { name: 'C', children: [] };
// const nodeD = { name: 'D', children: [] };

// // Define edges (connections)
// nodeA.children = [nodeB, nodeC];
// nodeB.children = [nodeA, nodeD];
// nodeC.children = [nodeA, nodeD];
// nodeD.children = [nodeB, nodeC];

// // All nodes in the graph
// const allNodes = [nodeA, nodeB, nodeC, nodeD];

// // Find shortest path from node A to node D
// const shortestDistance = dijkstra(nodeA, nodeD, allNodes);

// console.log(`Shortest distance from A to D is: ${shortestDistance}`);

const prettyPrintGrid = (e) => {
  for (let i = 0; i < e.length; i++) {
    const row = e[i];
    let yLabel = `${i}  `;
    if (i == 0) {
      let xLabel = '   ';
      for (let j = 0; j < row.length; j++) {
        xLabel += `${j} `;
      }
      console.log(xLabel);
    }
    for (let j = 0; j < row.length; j++) {
      yLabel += `${row[j]} `;
    }
    console.log(yLabel);
  }
  console.log('\n');
};

module.exports = {
  perf,
  lcm,
  permuteWithRepetition,
  dijkstra,
  bfsAllPaths,
  bfsFind,
  prettyPrintGrid
};
