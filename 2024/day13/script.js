let input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const { lcm } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

const fs = require('fs');
input = fs.readFileSync(__dirname + '/input.txt').toString();

const solveEquations = ({ a1, b1, c1, a2, b2, c2 }) => {
  const newB1 = b1 * a2;
  const newC1 = c1 * a2;

  const newB2 = b2 * a1;
  const newC2 = c2 * a1;

  const b = (newC2 - newC1) / (newB2 - newB1);

  const a = (c1 - b1 * b) / a1;

  return { a, b };
};

const part1 = () => {
  let total = 0;
  input
    .split('\n\n')
    .map((game) => {
      const [buttonA, buttonB, prize] = game.split('\n');
      const buttonAvalues = [...buttonA.matchAll(/\d+/g)].map(Number);
      const buttonBvalues = [...buttonB.matchAll(/\d+/g)].map(Number);
      const prizePosition = [...prize.matchAll(/\d+/g)].map(Number);

      return {
        A: {
          x: buttonAvalues[0],
          y: buttonAvalues[1]
        },
        B: {
          x: buttonBvalues[0],
          y: buttonBvalues[1]
        },
        prizePosition: {
          x: prizePosition[0],
          y: prizePosition[1]
        }
      };
    })
    .forEach(({ A, B, prizePosition }) => {
      const solve = solveEquations({
        a1: A.x,
        b1: B.x,
        c1: prizePosition.x,
        a2: A.y,
        b2: B.y,
        c2: prizePosition.y
      });
      if (
        Math.floor(solve.a) === solve.a &&
        !(solve.a > 100) &&
        solve.a >= 0 &&
        solve.b >= 0 &&
        !(solve.b > 100)
      ) {
        total += solve.a * 3 + solve.b;
        // console.log('solve----', solve);
      }
    });
  return total;
};
const part2 = () => {
  let total = 0;
  input
    .split('\n\n')
    .map((game) => {
      const [buttonA, buttonB, prize] = game.split('\n');
      const buttonAvalues = [...buttonA.matchAll(/\d+/g)].map(Number);
      const buttonBvalues = [...buttonB.matchAll(/\d+/g)].map(Number);
      const prizePosition = [...prize.matchAll(/\d+/g)].map(Number);

      return {
        A: {
          x: buttonAvalues[0],
          y: buttonAvalues[1]
        },
        B: {
          x: buttonBvalues[0],
          y: buttonBvalues[1]
        },
        prizePosition: {
          x: prizePosition[0] + 10000000000000,
          y: prizePosition[1] + 10000000000000
        }
      };
    })
    .forEach(({ A, B, prizePosition }) => {
      const solve = solveEquations({
        a1: A.x,
        b1: B.x,
        c1: prizePosition.x,
        a2: A.y,
        b2: B.y,
        c2: prizePosition.y
      });
      if (
        Math.floor(solve.a) === solve.a &&
        solve.a >= 0 &&
        solve.b >= 0 &&
        Math.floor(solve.b) === solve.b
      ) {
        total += solve.a * 3 + solve.b;
      }
    });
  return total;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
