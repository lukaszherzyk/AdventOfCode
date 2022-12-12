let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = (input, arr) => {
  const position = arr;
  const visited = [{ x: 0, y: 0 }];
  input.split('\n').forEach((line) => {
    const direction = line.split(' ')[0];
    const distance = +line.split(' ')[1];
    for (let i = 0; i < distance; i++) {
      for (let j = 0; j < position.length; j++) {
        const head = position[j];
        if (j === position.length - 1) {
          visited.push({ x: head.x, y: head.y });
          continue;
        }
        if (j === 0) {
          switch (direction) {
            case 'R':
              head.x += 1;
              break;
            case 'L':
              head.x -= 1;
              break;
            case 'U':
              head.y += 1;
              break;
            case 'D':
              head.y -= 1;
              break;

            default:
              break;
          }
        }
        const tail = position[j + 1];
        const diffX = Math.abs(head.x - tail.x);
        const diffY = Math.abs(head.y - tail.y);
        if (diffX <= 1 && diffY <= 1) {
          continue;
        }
        let y = 1;
        let x = 1;
        if (head.y < tail.y) {
          y = -1;
        }
        if (head.x < tail.x) {
          x = -1;
        }
        if (head.x === tail.x) {
          tail.y += 1 * y;
          continue;
        }
        if (head.y === tail.y) {
          tail.x += 1 * x;
          continue;
        }

        tail.x += 1 * x;
        tail.y += 1 * y;
      }
    }
  });

  return [...new Set(visited.map(JSON.stringify))].length;
};

console.log(
  'part1',
  part1(input, [
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ])
);
console.log(
  'part2',
  part1(input, [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ])
);
