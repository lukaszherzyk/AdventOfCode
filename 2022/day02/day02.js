// A - Rock
// B - Paper
// C - Scissors

// X - Rock
// Y - Paper
// Z - Scissors

let input = `A Y
B X
C Z
`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

// A,X > C,Z
// B,Y > A,X
// C,Z > B,Y

const part1 = (input) => {
  const points = new Map();
  points.set('X', 1);
  points.set('Y', 2);
  points.set('Z', 3);
  points.set('win', 6);
  points.set('draw', 3);

  const sameMove = (a, b) => {
    return (a === 'A' && b === 'X') || (a === 'B' && b === 'Y') || (a === 'C' && b === 'Z');
  };
  const lost = (a, b) => {
    return (a === 'A' && b === 'Z') || (a === 'B' && b === 'X') || (a === 'C' && b === 'Y');
  };

  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(' '))
    .reduce((acc, [a, b]) => {
      if (sameMove(a, b)) {
        return acc + points.get('draw') + points.get(b);
      }
      if (lost(a, b)) {
        return acc + points.get(b);
      }
      return acc + points.get('win') + points.get(b);
    }, 0);
};

const part2 = (input) => {
  const points = new Map();
  points.set('X', 1);
  points.set('Y', 2);
  points.set('Z', 3);
  points.set('win', 6);
  points.set('draw', 3);
  const getLosingMove = (move) => {
    if (move === 'A') {
      return 'Z';
    }
    if (move === 'B') {
      return 'X';
    }
    if (move === 'C') {
      return 'Y';
    }
  };
  const getWinningMove = (move) => {
    if (move === 'A') {
      return 'Y';
    }
    if (move === 'B') {
      return 'Z';
    }
    if (move === 'C') {
      return 'X';
    }
  };
  const getDrawMove = (move) => {
    if (move === 'A') {
      return 'X';
    }
    if (move === 'B') {
      return 'Y';
    }
    if (move === 'C') {
      return 'Z';
    }
  };

  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(' '))
    .reduce((acc, [a, b]) => {
      if (b === 'X') {
        return acc + points.get(getLosingMove(a));
      }
      if (b === 'Y') {
        return acc + points.get('draw') + points.get(getDrawMove(a));
      }
      return acc + points.get('win') + points.get(getWinningMove(a));
    }, 0);
};

console.log(part1(input));
console.log(part2(input));
