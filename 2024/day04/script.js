let input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const part1 = () => {
  const matrix = input.split('\n');
  let counter = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const {
        rigth,
        bottomRight,
        bottom,
        bottomLeft,
        left,
        topLeft,
        top,
        topRight
      } = {
        rigth: [
          matrix[i]?.[j],
          matrix[i]?.[j + 1],
          matrix[i]?.[j + 2],
          matrix[i]?.[j + 3]
        ],
        bottomRight: [
          matrix[i]?.[j],
          matrix[i + 1]?.[j + 1],
          matrix[i + 2]?.[j + 2],
          matrix[i + 3]?.[j + 3]
        ],
        bottom: [
          matrix[i]?.[j],
          matrix[i + 1]?.[j],
          matrix[i + 2]?.[j],
          matrix[i + 3]?.[j]
        ],
        bottomLeft: [
          matrix[i]?.[j],
          matrix[i + 1]?.[j - 1],
          matrix[i + 2]?.[j - 2],
          matrix[i + 3]?.[j - 3]
        ],
        left: [
          matrix[i]?.[j],
          matrix[i]?.[j - 1],
          matrix[i]?.[j - 2],
          matrix[i]?.[j - 3]
        ],
        topLeft: [
          matrix[i]?.[j],
          matrix[i - 1]?.[j - 1],
          matrix[i - 2]?.[j - 2],
          matrix[i - 3]?.[j - 3]
        ],
        top: [
          matrix[i]?.[j],
          matrix[i - 1]?.[j],
          matrix[i - 2]?.[j],
          matrix[i - 3]?.[j]
        ],
        topRight: [
          matrix[i]?.[j],
          matrix[i - 1]?.[j + 1],
          matrix[i - 2]?.[j + 2],
          matrix[i - 3]?.[j + 3]
        ]
      };

      [
        rigth,
        bottomRight,
        bottom,
        bottomLeft,
        left,
        topLeft,
        top,
        topRight
      ].forEach((el) => {
        if (el.join('') === 'XMAS') {
          counter++;
        }
      });
    }
  }

  return counter;
};

const part2 = () => {
  const matrix = input.split('\n');
  let counter = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const center = matrix[i]?.[j];
      const topRight = matrix[i - 1]?.[j + 1];
      const bottomRight = matrix[i + 1]?.[j + 1];
      const bottomLeft = matrix[i + 1]?.[j - 1];
      const topLeft = matrix[i - 1]?.[j - 1];
      if (center === 'A') {
        if (['MAS', 'SAM'].includes(bottomLeft + center + topRight)) {
          if (['MAS', 'SAM'].includes(topLeft + center + bottomRight)) {
            counter++;
          }
        }
      }
    }
  }
  return counter;
};

console.log(part1());

console.log(part2());
