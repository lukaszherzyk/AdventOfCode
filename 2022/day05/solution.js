let input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const part1 = (isCrateMover9001) => {
  const [crates, moves] = input.split('\n\n');

  const stacks = [];
  crates.split('\n').map((line) => {
    line
      .match(/.{4}|.{3}/g)
      .map((e) => e.trim())
      .forEach((e, i) => {
        if (e && isNaN(e)) {
          const index = i + 1;
          stacks[index] ? (stacks[index] = [e, ...stacks[index]]) : (stacks[index] = [e]);
        }
      });
  });

  moves.split('\n').map((line, index) => {
    const [numberOfCratesToMove, fromStack, toStack] = line.match(/\d+/g).map(Number);

    const toMove = stacks[fromStack].splice(-numberOfCratesToMove);
    stacks[toStack].push(...(isCrateMover9001 ? toMove : toMove.reverse()));
  });
  return stacks.reduce((acc, stack) => {
    if (!stack) {
      return acc;
    }

    return acc + stack[stack.length - 1].split('')[1];
  }, '');
};

console.log('part1', part1());
console.log('part2', part1(true));
