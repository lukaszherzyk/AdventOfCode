let input = `2333133121414131402`;

// console.log = function (...args) {
//   args = args.map((arg) =>
//     typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
//   );
//   originalLog.apply(console, args);
// };

input = fs.readFileSync(__dirname + '/input.txt').toString();

const prettyPrint = (e) => {
  console.log(e.map((el) => el.join(' ')));
};

const part1 = () => {
  let id = 0;
  const disk = input
    .split('')
    .map((el, index) => {
      if (index % 2 === 0) {
        const v = Array.from({ length: el }, () => id).join('-');
        id++;

        return v;
      }
      return Array.from({ length: el }, () => '.').join('-');
    })
    .filter(Boolean)
    .join('-')
    .split('-');

  let checksum = 0;
  let furthestIndex = disk.length - 1;
  for (let i = 0; i < furthestIndex; i++) {
    if (disk[i] === '.') {
      while (true) {
        if (disk[furthestIndex] !== '.') {
          disk[i] = disk[furthestIndex];
          disk[furthestIndex] = '.';
          break;
        }
        furthestIndex--;
      }
    }
  }
  disk
    .filter((el) => el !== '.')
    .forEach((el, index) => {
      checksum += index * Number(el);
    });

  return checksum;
};

const part2 = () => {
  let id = 0;
  const disk = input
    .split('')
    .map((el, index) => {
      if (index % 2 === 0) {
        const v = Array.from({ length: el }, () => id).join('-');
        id++;

        return v;
      }
      return Array.from({ length: el }, () => '.').join('-');
    })
    .filter(Boolean)
    .join('-')
    .split('-');

  let furthestIndex = disk.length - 1;
  let i = 0;
  id = null;
  const findSpaceBlock = (memoryLength) => {
    const spaceBlock = [];
    for (let x = 0; x < disk.length; x++) {
      if (spaceBlock.length && disk[x] !== '.') {
        spaceBlock.length = 0;
      }
      if (disk[x] === '.') {
        spaceBlock.push(x);
      }
      if (spaceBlock.length === memoryLength) {
        return { spaceBlock };
      }
    }
    return { spaceBlock };
  };
  const findBlock = (start) => {
    const block = [];
    let id = null;
    let x = start;
    for (x; x > 0; x--) {
      const currentId = disk[x];

      if (currentId !== '.') {
        if (id === null) {
          id = currentId;
          block.push(x);
        } else {
          if (id !== currentId) {
            return { id, block, x, newFurthestIndex: x };
          }
          block.push(x);
        }
      }
    }
    return { id, block, newFurthestIndex: x };
  };

  while (true) {
    const { block, id, newFurthestIndex } = findBlock(furthestIndex);
    if (block.length === 0) {
      break;
    }
    furthestIndex = newFurthestIndex;

    const { spaceBlock } = findSpaceBlock(block.length);

    if (spaceBlock[spaceBlock.length - 1] > block[0]) {
      i = 0;
    } else {
      block.forEach((el, index) => {
        disk[spaceBlock[index]] = id;
        disk[el] = '.';
      });
    }
  }
  let checksum = 0;

  disk.forEach((el, index) => {
    if (el !== '.') {
      checksum += index * Number(el);
    }
  });

  return checksum;
};

console.log('PART_1:   ', part1());
console.log('PART_2:   ', part2());
