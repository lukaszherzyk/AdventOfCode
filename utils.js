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

const bfs = (graph, startNode) => {
  const visited = new Set();
  const queue = [startNode];

  while (queue.length > 0) {
    const node = queue.shift();
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

  return Array.from(visited);
};

// ============= bfs
// const graph = {
//   A: ['B', 'C'],
//   B: ['A', 'D', 'E'],
//   C: ['A', 'F'],
//   D: ['B'],
//   E: ['B', 'F'],
//   F: ['C', 'E']
// };

// const result = bfs(graph, 'A');
// console.log(result); // Output: ['A', 'B', 'C', 'D', 'E', 'F']

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

module.exports = { perf, lcm, permuteWithRepetition, dijkstra, bfs };
