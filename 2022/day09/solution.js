let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const isAdjacent = (head, tail, p) => {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
};
const part1 = (input) => {
  const position = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 }
  };
  const visited = [{ x: 0, y: 0 }];
  input.split('\n').forEach((line) => {
    const [direction, distance] = line.split(' ').map((x) => {
      return isNaN(x) ? x : parseInt(x);
    });

    const { head, tail } = position;

    switch (direction) {
      case 'R':
        head.x += distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.x > tail.x) {
          if (head.y !== tail.y) {
            tail.y = head.y;
          }
          const relativeDistance = Math.abs(head.x - tail.x);

          for (let i = 1; i < relativeDistance; i++) {
            visited.push({ x: head.x - i, y: head.y });
          }
          tail.x = head.x - 1;
        }
        break;
      case 'L':
        head.x -= distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.x < tail.x) {
          if (head.y !== tail.y) {
            tail.y = head.y;
          }
          const relativeDistance = Math.abs(head.x - tail.x);
          for (let i = 1; i < relativeDistance; i++) {
            visited.push({ x: head.x + i, y: head.y });
          }
          tail.x = head.x + 1;
        }
        break;
      case 'U':
        head.y += distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.y > tail.y) {
          if (head.x !== tail.x) {
            tail.x = head.x;
          }
          const relativeDistance = Math.abs(head.y - tail.y);
          for (let i = 1; i < relativeDistance; i++) {
            visited.push({ x: head.x, y: head.y - i });
          }
          tail.y = head.y - 1;
        }
        break;
      case 'D':
        head.y -= distance;
        if (isAdjacent(head, tail)) {
          return;
        }

        if (head.y < tail.y) {
          if (head.x !== tail.x) {
            tail.x = head.x;
          }
          const relativeDistance = Math.abs(head.y - tail.y);
          for (let i = 1; i < relativeDistance; i++) {
            visited.push({ x: head.x, y: head.y + i });
          }
          tail.y = head.y + 1;
        }
        break;
    }
  });
  return [...new Set(visited.map(JSON.stringify))].length;
};

const part2 = (input) => {
  const visited = [{ x: 0, y: 0 }];

  const position = {
    head: { x: 0, y: 0 },
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
    9: { x: 0, y: 0 },
    tail: { x: 0, y: 0 }
  };
  const calcPosition = (a, b, direction, distance) => {
    console.log('calcPosition');
    const head = position[a];
    const tail = position[b];
    console.log({ a, b, direction, distance });
    const isRealTail = b === 'tail';
    switch (direction) {
      case 'R':
        head.x += distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.x > tail.x) {
          if (head.y !== tail.y) {
            tail.y = head.y;
          }
          const relativeDistance = Math.abs(head.x - tail.x);
          if (isRealTail) {
            for (let i = 1; i < relativeDistance; i++) {
              visited.push({ x: head.x - i, y: head.y });
            }
          }
          tail.x = head.x - 1;
        }
        break;
      case 'L':
        head.x -= distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.x < tail.x) {
          if (head.y !== tail.y) {
            tail.y = head.y;
          }
          const relativeDistance = Math.abs(head.x - tail.x);
          if (isRealTail) {
            for (let i = 1; i < relativeDistance; i++) {
              visited.push({ x: head.x + i, y: head.y });
            }
          }
          tail.x = head.x + 1;
        }
        break;
      case 'U':
        head.y += distance;
        if (isAdjacent(head, tail)) {
          return;
        }
        if (head.y > tail.y) {
          if (head.x !== tail.x) {
            tail.x = head.x;
          }
          const relativeDistance = Math.abs(head.y - tail.y);
          if (isRealTail) {
            for (let i = 1; i < relativeDistance; i++) {
              visited.push({ x: head.x, y: head.y - i });
            }
          }
          tail.y = head.y - 1;
        }
        break;
      case 'D':
        head.y -= distance;
        if (isAdjacent(head, tail)) {
          return;
        }

        if (head.y < tail.y) {
          if (head.x !== tail.x) {
            tail.x = head.x;
          }
          const relativeDistance = Math.abs(head.y - tail.y);
          if (isRealTail) {
            for (let i = 1; i < relativeDistance; i++) {
              visited.push({ x: head.x, y: head.y + i });
            }
          }
          tail.y = head.y + 1;
        }
        break;
    }
    if (isRealTail) {
      return;
    }
    calcPosition(b, 'tail', direction, distance);
  };
  calcPosition('9', 'tail', 'R', 3);
  input.split('\n').forEach((line) => {
    const [direction, distance] = line.split(' ').map((x) => {
      return isNaN(x) ? x : parseInt(x);
    });
  });
};
console.log('part1', part1(input));
console.log('part2', part2(input));
