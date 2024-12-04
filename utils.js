const { performance } = require('perf_hooks');

const perf = (fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`elapsed: ${end - start}ms`);
};

const lcm = (arr) => {
  const gcd = (x, y) => (y ? gcd(y, x % y) : x);
  return [...arr].reduce((a, b) => (a * b) / gcd(a, b));
};
module.exports = { perf, lcm };
