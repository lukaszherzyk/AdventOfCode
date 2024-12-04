let input = 'abcdef';

// input = 'bgvyzdsv';
const crypto = require('crypto');

let hash = crypto.createHash('md5').update('some_string').digest('hex');
const part1 = () => {};
const part2 = () => {};
console.log('part1:', part1());
console.log('part2:', part2());
