const { lcm } = require('../../utils.js');

let input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  let [directions, nodes] = input.replace(/\(|\)/g, '').split('\n\n');
  const map = {};
  nodes.split('\n').map((e) => {
    const [node, leftRight] = e.split(' = ');
    map[node] = {
      left: leftRight.split(',')[0],
      right: leftRight.split(',')[1].trim()
    };
  });

  let steps = 0;
  let counter = 0;
  let isEnd = false;
  let currentKey = 'AAA';

  while (!isEnd) {
    if (currentKey === 'ZZZ') {
      return steps;
    }
    const direction = directions[steps % directions.length];
    if (direction === 'R') {
      currentKey = map[currentKey].right;
    } else {
      currentKey = map[currentKey].left;
    }
    steps++;
  }
};

console.log(part1());

const part2 = () => {
  let [directions, nodes] = input.replace(/\(|\)/g, '').split('\n\n');
  const map = {};
  nodes.split('\n').map((e) => {
    const [node, leftRight] = e.split(' = ');
    map[node] = {
      left: leftRight.split(',')[0],
      right: leftRight.split(',')[1].trim()
    };
  });

  const keysEndsWithA = Object.keys(map).filter((k) => k[2] === 'A');
  const keysEndsWithZ = Object.keys(map).filter((k) => k[2] === 'Z');

  return lcm(
    keysEndsWithA.reduce((prev, curr) => {
      let currentKey = curr;
      let steps = 0;
      let isEnd = false;
      while (!isEnd) {
        if (keysEndsWithZ.includes(currentKey)) {
          return [...prev, steps];
        }
        const direction = directions[steps % directions.length];
        if (direction === 'R') {
          currentKey = map[currentKey].right;
        } else {
          currentKey = map[currentKey].left;
        }
        steps++;
      }
    }, [])
  );
};
console.log(part2());
