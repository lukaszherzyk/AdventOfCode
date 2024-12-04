input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const solution = () => {
  const grid = input.split('\n').map((line) => line.split(''));
  const start = [];
  for (i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'S') {
        start[0] = i;
        start[1] = j;
      }
    }
  }

  let current = start;
  const visited = [start];

  let c = 0;

  const canGoLeft = (element) => ['S', '-', 'J', '7'].includes(element);
  const canGoTop = (element) => ['S', '|', , 'L', 'J'].includes(element);
  const canGoRight = (element) => ['S', '-', 'L', 'F'].includes(element);
  const canGoBottom = (element) => ['S', '|', '7', 'F'].includes(element);

  while (true) {
    if (c === 1) {
      console.log({ current, c: grid[current[0]][current[1]] });
    }
    c++;
    const i = current[0];
    const j = current[1];
    const currentSymbol = grid[i][j];
    const left = grid[i]?.[j - 1];
    if (
      canGoLeft(currentSymbol) &&
      ['-', 'L', 'F', 'S'].includes(left) &&
      !visited.some((e) => e[0] === i && e[1] === j - 1)
    ) {
      current = [i, j - 1];
      visited.push([i, j - 1]);
      continue;
    }
    const top = grid[i - 1]?.[j];
    if (
      canGoTop(currentSymbol) &&
      ['|', 'F', '7', 'S'].includes(top) &&
      !visited.some((e) => e[0] === i - 1 && e[1] === j)
    ) {
      current = [i - 1, j];
      visited.push([i - 1, j]);
      continue;
    }

    const right = grid[i]?.[j + 1];
    if (
      canGoRight(currentSymbol) &&
      ['-', '7', 'J', 'S'].includes(right) &&
      !visited.some((e) => e[0] === i && e[1] === j + 1)
    ) {
      current = [i, j + 1];

      visited.push([i, j + 1]);
      continue;
    }
    const bottom = grid[i + 1]?.[j];
    if (
      canGoBottom(currentSymbol) &&
      ['|', 'L', 'J', 'S'].includes(bottom) &&
      !visited.some((e) => {
        return e[0] === i + 1 && e[1] === j;
      })
    ) {
      current = [i + 1, j];
      visited.push([i + 1, j]);
      continue;
    }
    c++;

    break;
  }

  function countInversions(i, j) {
    const line = grid[i];
    let count = 0;
    for (let k = 0; k < j; k++) {
      if (!visited.some((e) => e[0] === i && e[1] === k)) {
        continue;
      }
      count += ['J', 'L', '|'].includes(line[k]);
    }

    return count;
  }

  // should be more generic TBH
  grid[start[0]][start[1]] = 'J';
  let ans = 0;
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (!visited.some((e) => e[0] === i && e[1] === j)) {
        const invs = countInversions(i, j);
        if (invs % 2 === 1) {
          ans += 1;
        }
      }
    }
  }

  console.log('part1: ', Math.floor(c / 2));
  console.log('part2: ', ans);
};
solution();
