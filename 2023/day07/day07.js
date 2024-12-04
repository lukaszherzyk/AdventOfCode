let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

const getNumberOFJokers = (hand) => [...hand.matchAll(/J/g)].length;

const isThree = (hand) => {
  const unique = [...new Set(hand.split(''))];
  if (unique.length === 3) {
    return unique.some((u) => hand.split('').filter((e) => e === u).length === 3);
  }
  return false;
};
const isTwo = (hand) => {
  const unique = [...new Set(hand.split(''))];

  return (
    unique.reduce((prev, curr) => {
      return hand.split('').filter((e) => e === curr).length === 2 ? prev + 1 : prev;
    }, 0) >= 2
  );
};
const isFour = (hand) => {
  const arr = hand.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr.filter((e) => e === arr[i]).length === 4) {
      return true;
    }
  }
  return false;
};
const isFullHouse = (hand) => {
  const arr = hand.split('').sort();
  const a = arr.filter((e) => e === arr[0]).length;
  const b = arr.filter((e) => e === arr[4]).length;
  if ((a === 3 && b === 2) || (a === 2 && b === 3)) {
    return true;
  }
  return false;
};
const getStrength = (hand) => {
  const unique = [...new Set(hand.split(''))].length;
  if (unique === 5) {
    // high card
    return 1;
  }
  if (unique === 1) {
    // five
    return 7;
  }
  if (unique === 4) {
    // one pair
    return 2;
  }
  if (isFour(hand)) {
    return 6;
  }
  if (isFullHouse(hand)) {
    return 5;
  }
  if (isThree(hand)) {
    return 4;
  }
  if (isTwo(hand)) {
    return 3;
  }

  throw new Error('no Strength__  ' + hand);
};
const getStrengthWithJokers = (hand) => {
  const unique = [...new Set(hand.split(''))].length;
  const jokers = getNumberOFJokers(hand);
  if (unique === 1) {
    // five

    return 7;
  }
  if (isFour(hand)) {
    if (jokers === 1 || jokers === 4) {
      return 7;
    }
    return 6;
  }
  if (isFullHouse(hand)) {
    if (jokers) {
      return 7;
    }
    return 5;
  }
  if (isThree(hand)) {
    if (jokers) {
      return 6;
    }

    return 4;
  }
  if (isTwo(hand)) {
    if (jokers === 1) {
      return 5;
    }
    if (jokers === 2) {
      return 6;
    }
    return 3;
  }
  if (unique === 4) {
    // one pair

    if (jokers === 1) {
      return 4;
    }
    if (jokers === 2) {
      return 4;
    }
    return 2;
  }
  if (unique === 5) {
    // high card

    if (jokers) {
      return 2;
    }
    return 1;
  }

  throw new Error('no Strength__  ' + hand);
};
const compareTwo = (a, b, part2) => {
  const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  const cards2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

  let c = 0;
  while (c < 5) {
    if (a[c] !== b[c]) {
      if (part2) {
        return cards2.indexOf(a[c]) < cards2.indexOf(b[c]) ? 1 : -1;
      }
      return cards.indexOf(a[c]) < cards.indexOf(b[c]) ? 1 : -1;
    }
    c++;
  }
  return 0;
};
const part1 = () => {
  return input
    .split('\n')
    .map((e) => {
      const [hand, bid] = e.split(' ');

      return { hand, bid: Number(bid), strength: getStrength(hand) };
    })
    .sort((a, b) => {
      if (a.strength === b.strength) {
        return compareTwo(a.hand, b.hand);
      }
      return a.strength - b.strength;
    })
    .reduce((prev, curr, index) => {
      return prev + curr.bid * (index + 1);
    }, 0);
};

console.log('part1:', part1());

const part2 = () => {
  return input
    .split('\n')
    .map((e) => {
      const [hand, bid] = e.split(' ');

      return {
        hand,
        bid: Number(bid),
        strength: getStrengthWithJokers(hand)
      };
    })

    .sort((a, b) => {
      if (a.strength === b.strength) {
        return compareTwo(a.hand, b.hand, true);
      }
      return a.strength - b.strength;
    })
    .map((e) => {
      if (getNumberOFJokers(e.hand)) {
        return e;
      }
      return e;
    })
    .reduce((prev, curr, index) => {
      return prev + curr.bid * (index + 1);
    }, 0);
};

console.log('part2:', part2());
