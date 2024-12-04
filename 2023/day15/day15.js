let input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

//input = require('fs')
//  .readFileSync(__dirname + '/input.txt')
//  .toString();

const part1 = () => {
  return input.split(',');
};

console.log('part1', part1);
