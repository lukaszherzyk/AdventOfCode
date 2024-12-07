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

const permuteWithRepetition = (arr, length) => {
  if (length === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];
  const smallerPermutations = permuteWithRepetition(arr, length - 1);

  arr.forEach((el) => {
    smallerPermutations.forEach((smallerPerm) => {
      result.push([el, ...smallerPerm]);
    });
  });

  return result;
};

module.exports = { perf, lcm, permuteWithRepetition };
