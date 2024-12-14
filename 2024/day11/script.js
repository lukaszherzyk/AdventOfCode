let input = `125 17`;

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

const fs = require('fs');
input = fs.readFileSync(__dirname + '/input.txt').toString();
const part1 = () => {
  const initialStones = input.split(' ').map(Number);

  let stones = [...initialStones];

  for (let i = 0; i < 25; i++) {
    const stonesCopy = [...stones];

    stones.forEach((el, index) => {
      const newStones = getNewStones(el);
      stonesCopy[index] = newStones;
    });
    stones = stonesCopy.flat(Infinity);
  }
  return stones.length;
};

const cache = {};

const getNewStones = (stone) => {
  if (stone === 0) {
    return [1];
  }
  const stoneSplitted = stone.toString().split('');
  if (stoneSplitted.length % 2 === 0) {
    const stone1 = Number(
      stoneSplitted.slice(0, stoneSplitted.length / 2).join('')
    );
    const stone2 = Number(
      stoneSplitted.slice(stoneSplitted.length / 2).join('')
    );
    return [stone1, stone2];
  }
  return [stone * 2024];
};

const getScore = (stone, iter) => {
  const cacheKey = `${stone}-${iter}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  if (iter === 0) {
    return 1;
  }

  const newStones = getNewStones(stone);
  let score = 0;

  if (newStones.length === 2) {
    score = getScore(newStones[0], iter - 1) + getScore(newStones[1], iter - 1);
  } else {
    score = getScore(newStones[0], iter - 1);
  }

  cache[cacheKey] = score;
  return score;
};

const part2 = () => {
  const initialStones = input.split(' ').map(Number);

  let stones2 = [...initialStones];
  let sum = 0;
  stones2.forEach((stone, index) => {
    sum += getScore(stone, 75);
  });

  return sum;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
