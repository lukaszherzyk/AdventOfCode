let input = `1Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(':')[1]
        .split(';')
        .map((games) =>
          games
            .split(',')
            .map((e) => ({ [e.trim().split(' ')[1]]: Number(e.trim().split(' ')[0]) }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {})
        )
    )
    .reduce(
      (prev, curr, index) =>
        curr.every((g) => {
          if (
            (g['red'] && g['red'] > 12) ||
            (g['green'] && g['green'] > 13) ||
            (g['blue'] && g['blue'] > 14)
          ) {
            return false;
          }
          return true;
        })
          ? prev + index + 1
          : prev,
      0
    );
};

console.log(part1());

const part2 = () => {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(':')[1]
        .split(';')
        .map((games) =>
          games
            .split(',')
            .map((e) => ({ [e.trim().split(' ')[1]]: Number(e.trim().split(' ')[0]) }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {})
        )
    )
    .reduce((prev, curr) => {
      const mins = { red: 1, green: 1, blue: 1 };
      curr.forEach((el) => {
        if (el['red'] && el['red'] > mins['red']) {
          mins['red'] = el['red'];
        }
        if (el['green'] && el['green'] > mins['green']) {
          mins['green'] = el['green'];
        }
        if (el['blue'] && el['blue'] > mins['blue']) {
          mins['blue'] = el['blue'];
        }
      });
      return prev + mins['red'] * mins['green'] * mins['blue'];
    }, 0);
};

console.log(part2());
