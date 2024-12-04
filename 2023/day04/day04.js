let input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(': ')
        .slice(1)
        .map((e) =>
          e
            .trim()
            .split(' | ')
            .map((e) => e.split(/\s+/g).map(Number))
        )
        .flat()
    )
    .reduce((prev, curr) => {
      const [winning, mine] = curr;

      const match = [];
      winning.forEach((e) => {
        if (mine.includes(e) && !match.includes(e)) {
          match.push(e);
        }
      });
      return (
        prev +
        [...new Set(match)].reduce((prev, curr, index) => {
          if (index === 0) {
            return 1;
          }
          return (prev *= 2);
        }, 0)
      );
    }, 0);
};

console.log(part1());

const part2 = () => {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(': ')
        .slice(1)
        .map((e) =>
          e
            .trim()
            .split(' | ')
            .map((e) => e.split(/\s+/g).map(Number))
        )
        .flat()
    )
    .reduce(
      (prev, curr) => {
        const [winning, mine] = curr;

        let copiesWon = 0;
        let total = 0;

        let copies = prev.copies.slice(1);

        for (let i = 0; i < prev.copies[0]; i++) {
          winning.forEach((e) => {
            if (mine.includes(e)) {
              copiesWon++;
              total++;
            }
          });
          for (let i = 0; i < copiesWon; i++) {
            copies[i] ? (copies[i] = copies[i] + 1) : (copies[i] = 1);
          }
          copiesWon = 0;
        }
        copiesWon = 0;

        winning.forEach((e) => {
          if (mine.includes(e)) {
            copiesWon++;
            total++;
          }
        });
        for (let i = 0; i < copiesWon; i++) {
          copies[i] ? (copies[i] = copies[i] + 1) : (copies[i] = 1);
        }

        return {
          scratchcardsWon: prev.scratchcardsWon + total + 1,
          copies
        };
      },
      { scratchcardsWon: 0, copies: [] }
    );
};

console.log(part2().scratchcardsWon);
