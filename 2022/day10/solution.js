let input = `noop
addx 3
addx -5`;

const part1 = (input) => {
  let register = 1;
  const queue = [];
  const lines = input.split('\n').forEach((element) => {
    queue.push(element);
  });
  while (queue.length > 0) {
    const line = queue.shift();
    const [command, value] = line.split(' ');
  }
};
