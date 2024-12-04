let input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();
const solution = (input) => {
  const queue = [];
  const lines = input.split('\n').forEach((element) => {
    if (element === 'noop') {
      queue.push({ command: 'noop', value: 0 });
    } else {
      queue.push({ command: 'addx', value: +element.split(' ')[1] });
    }
  });
  let cycle = 0;
  let sum = 0;
  let register = 1;
  const cycles = [20, 60, 100, 140, 180, 220];
  const crtCycle = [40, 80, 120, 160, 200, 240];
  const allValues = [1];
  let command = '';
  let value = 0;
  let cyclesToFinish = 0;
  let row = 0;
  let crt = [[], [], [], [], [], []];
  let drawIndex = 0;
  while (queue.length > 0) {
    if (crtCycle.indexOf(cycle) > -1) {
      row++;
      drawIndex = 0;
    }
    cycle++;
    cyclesToFinish = cyclesToFinish > 0 ? cyclesToFinish - 1 : 0;

    if (command === 'addx' && cyclesToFinish === 0) {
      allValues.push(value);
      register += value;
      command = '';
      value = 0;
    }

    if (cycles.indexOf(cycle) > -1) {
      sum += register * cycle;
    }

    if (!command) {
      const line = queue.shift();
      command = line.command;
      value = line.value;

      if (command === 'noop') {
        command = '';
        value = 0;
      } else {
        cyclesToFinish = 2;
      }
    }

    let toDraw = [register - 1, register, register + 1].indexOf(drawIndex) > -1 ? '█' : ' ';
    crt[row][cycle - 1] = toDraw;
    drawIndex++;
  }
  console.log('part1:', sum);
  console.log('part2: ');
  crt.forEach((row) => {
    console.log(row.join(''));
  });
};
solution(input);
