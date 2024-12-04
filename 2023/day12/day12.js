let input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
let m = 0;

let hit = 0;
const cache = {};
const count = (springs, damagedSprings) => {
  if (!springs) {
    return damagedSprings.length === 0 ? 1 : 0;
  }
  if (damagedSprings.length === 0) {
    return springs.includes('#') ? 0 : 1;
  }
  const cacheKey = springs + damagedSprings.join(',');
  if (cache[cacheKey]) {
    console.log('cache HIT', hit++);
    return cache[cacheKey];
  }
  let result = 0;

  if ('.?'.includes(springs[0])) {
    result += count(springs.slice(1), damagedSprings);
  }
  if ('#?'.includes(springs[0])) {
    if (
      damagedSprings[0] <= springs.length &&
      !springs.slice(0, damagedSprings[0]).includes('.') &&
      (damagedSprings[0] === springs.length || springs[damagedSprings[0]] !== '#')
    ) {
      result += count(springs.slice(damagedSprings[0] + 1), damagedSprings.slice(1));
    }
  }
  cache[cacheKey] = result;
  return result;
};
const part1 = (part2) => {
  return input
    .split('\n')
    .map((line) => {
      const [springs, damagedSprings] = line.split(' ');
      if (part2) {
        return {
          springs: `${springs}?${springs}?${springs}?${springs}?${springs}`,
          damagedSprings:
            `${damagedSprings},${damagedSprings},${damagedSprings},${damagedSprings},${damagedSprings}`
              .split(',')
              .map(Number)
        };
      }
      return {
        springs,
        damagedSprings: damagedSprings.split(',').map(Number)
      };
    })
    .reduce((prev, curr, index) => {
      console.log('curr', index + 1);
      const { springs, damagedSprings } = curr;
      const c = count(springs, damagedSprings);
      return prev + count(springs, damagedSprings);
    }, 0);
};

const part2 = () => part1(true);

console.log(part1());
console.log(part2());
