let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
const { performance } = require('perf_hooks');

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const findDestination = (target, maps) => {
  return maps.reduce((prev, curr) => {
    const [destinationRangeStart, sourceRangeStart, range] = curr;
    if (target >= sourceRangeStart && target < sourceRangeStart + range) {
      return destinationRangeStart + target - sourceRangeStart;
    }
    return prev === null ? target : prev;
  }, null);
};

const part1 = () => {
  const seeds = input.split('\n')[0].split(':')[1].trim().split(' ').map(Number);

  const maps = input
    .split('\n\n')
    .slice(1)
    .map((e) => {
      return e
        .split('\n')
        .slice(1)
        .map((e) => e.split(' ').map(Number));
    });

  return seeds.reduce((prev, curr) => {
    let dest;
    for (let i = 0; i < maps.length; i++) {
      dest = findDestination(dest ?? curr, maps[i]);
    }
    return prev === null ? dest : dest < prev ? dest : prev;
  }, null);
};

console.log(part1());
// Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
const findSeed = (location, maps) => {
  return maps.reduce((target, currentMap) => {
    return currentMap.reduce((prev, curr) => {
      const [sourceRangeStart, destinationRangeStart, range] = curr;
      if (target >= sourceRangeStart && target < sourceRangeStart + range) {
        return destinationRangeStart + target - sourceRangeStart;
      }
      return prev;
    }, target);
  }, location);
};

const inSeedRange = (seed, seedsRange) => {
  return seedsRange.some((el) => seed >= el[0] && seed <= el[1]);
};
const part2 = () => {
  const seeds = [
    ...input
      .split('\n')[0]
      .split(':')[1]
      .trim()
      .matchAll(/\d+\s+\d+/g)
  ].map((e) => {
    return {
      seed: Number(e[0].split(' ')[0]),
      range: Number(e[0].split(' ')[1])
    };
  });
  const maps = input
    .split('\n\n')
    .slice(1)
    .map((e) => {
      return e
        .split('\n')
        .slice(1)
        .map((e) => e.split(' ').map(Number));
    })
    .reverse();
  const seedRanges = seeds.reduce((prev, curr) => {
    return [...prev, [curr.seed, curr.seed + curr.range - 1]];
  }, []);

  let location = 0;
  let temp;
  while (true) {
    temp = findSeed(location, maps);

    if (inSeedRange(temp, seedRanges)) {
      return location;
    }

    location++;
  }
};
let now = performance.now();
console.log('part2:', part2());
console.log('part2 time: ', performance.now() - now);
