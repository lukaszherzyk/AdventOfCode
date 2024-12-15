let input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

//input = `p=2,4 v=0,-50`;

const { lcm, prettyPrintGrid, printGrid } = require('../../utils.js');

const originalLog = console.log;
console.log = function (...args) {
  args = args.map((arg) =>
    typeof arg === 'object' ? JSON.stringify(arg, null, '  ') : arg
  );
  originalLog.apply(console, args);
};

const fs = require('fs');
input = fs.readFileSync(__dirname + '/input.txt').toString();

const createGrid = (wide, tall) =>
  Array.from({ length: tall }, () => Array.from({ length: wide }, () => '.'));

const printCurrentGrid = (grid, robots, print) => {
  const copyGrid = JSON.parse(JSON.stringify(grid));
  robots.forEach(({ position }) => {
    const { y, x } = position;
    try {
      if (copyGrid[y][x] === '.') {
        copyGrid[y][x] = '#';
      } else {
        copyGrid[y][x] = copyGrid[y][x] + 1;
      }
    } catch (error) {
      console.log('ERROR', { y, x });
    }
  });

  print && printGrid(copyGrid);
  return copyGrid;
};

const getQuadrants = (wide, tall) => {
  const topLeft = [];
  const topRight = [];
  const bottomLeft = [];
  const bottomRight = [];
  for (let y = 0; y < tall; y++) {
    const isTop = y < tall / 2;
    for (let x = 0; x < wide; x++) {
      const isLeft = x < wide / 2;
      const isMiddle = y === Math.floor(tall / 2) || x === Math.floor(wide / 2);
      if (!isMiddle) {
        if (isTop) {
          if (isLeft) {
            topLeft.push({ y, x });
          } else {
            topRight.push({ y, x });
          }
        } else {
          if (isLeft) {
            bottomLeft.push({ y, x });
          } else {
            bottomRight.push({ y, x });
          }
        }
      }
    }
  }
  return [topLeft, topRight, bottomLeft, bottomRight];
};

const getQuadrantsBoundries = (wide, tall) => {
  const topLeft = {
    y: { min: 0, max: Math.floor(tall / 2) - 1 },
    x: { min: 0, max: Math.floor(wide / 2) - 1 }
  };
  const topRight = {
    y: { min: 0, max: Math.floor(tall / 2) - 1 },
    x: { min: Math.ceil(wide - wide / 2), max: wide - 1 }
  };
  const bottomLeft = {
    y: { min: tall - Math.floor(tall / 2), max: tall - 1 },
    x: { min: 0, max: Math.floor(wide / 2) - 1 }
  };
  const bottomRight = {
    y: { min: tall - Math.floor(tall / 2), max: tall - 1 },
    x: { min: Math.ceil(wide - wide / 2), max: wide - 1 }
  };

  return { topLeft, topRight, bottomLeft, bottomRight };
};

const isInBounderies = (boundries, position) => {
  return (
    boundries.y.min <= position.y &&
    boundries.y.max >= position.y &&
    boundries.x.min <= position.x &&
    boundries.x.max >= position.x
  );
};

const part1 = () => {
  const wide = 101;
  const tall = 103;
  const grid = createGrid(wide, tall);

  const quadrants = getQuadrants(wide, tall);

  //prettyPrintGrid(grid);

  const robots = input.split('\n').map((line) => {
    const [position, velocity] = line.split(' ');
    const [positionValuesX, positionValuesY] = [...position.matchAll(/-?\d+/g)]
      .flat()
      .map(Number);
    const [velocityValuesX, velocityValuesY] = [...velocity.matchAll(/-?\d+/g)]
      .flat()
      .map(Number);

    return {
      position: { x: positionValuesX, y: positionValuesY },
      velocity: { x: velocityValuesX, y: velocityValuesY }
    };
  });

  for (let i = 0; i < 100; i++) {
    robots.forEach(({ position, velocity }) => {
      const yDiff = (position.y + velocity.y) % tall;
      const xDiff = (position.x + velocity.x) % wide;
      let newY = (yDiff < 0 ? tall + yDiff : yDiff) % tall;
      let newX = (xDiff < 0 ? wide + xDiff : xDiff) % wide;

      position.y = newY;
      position.x = newX;
    });

    printCurrentGrid(grid, robots);
  }
  const quadrantsBoundries = getQuadrantsBoundries(wide, tall);
  let leftTop = 0;
  let rightTop = 0;
  let bottomLeft = 0;
  let bottomRight = 0;
  robots.forEach(({ position }) => {
    const isTopLeft = isInBounderies(quadrantsBoundries.topLeft, position);
    const isTopRight = isInBounderies(quadrantsBoundries.topRight, position);
    const isBottomLeft = isInBounderies(
      quadrantsBoundries.bottomLeft,
      position
    );
    const isBottomRight = isInBounderies(
      quadrantsBoundries.bottomRight,
      position
    );

    if (isTopLeft) {
      leftTop++;
    }
    if (isTopRight) {
      rightTop++;
    }
    if (isBottomLeft) {
      bottomLeft++;
    }
    if (isBottomRight) {
      bottomRight++;
    }
  });
  //console.log({ leftTop, rightTop, bottomLeft, bottomRight });
  return leftTop * rightTop * bottomLeft * bottomRight;
};

const calcSafety = (robots, wide, tall) => {
  const quadrantsBoundries = getQuadrantsBoundries(wide, tall);
  let leftTop = 0;
  let rightTop = 0;
  let bottomLeft = 0;
  let bottomRight = 0;
  robots.forEach(({ position }) => {
    const isTopLeft = isInBounderies(quadrantsBoundries.topLeft, position);
    const isTopRight = isInBounderies(quadrantsBoundries.topRight, position);
    const isBottomLeft = isInBounderies(
      quadrantsBoundries.bottomLeft,
      position
    );
    const isBottomRight = isInBounderies(
      quadrantsBoundries.bottomRight,
      position
    );

    if (isTopLeft) {
      leftTop++;
    }
    if (isTopRight) {
      rightTop++;
    }
    if (isBottomLeft) {
      bottomLeft++;
    }
    if (isBottomRight) {
      bottomRight++;
    }
  });

  return leftTop * rightTop * bottomLeft * bottomRight;
};
const part2 = () => {
  const wide = 101;
  const tall = 103;
  const grid = createGrid(wide, tall);

  const robots = input.split('\n').map((line) => {
    const [position, velocity] = line.split(' ');
    const [positionValuesX, positionValuesY] = [...position.matchAll(/-?\d+/g)]
      .flat()
      .map(Number);
    const [velocityValuesX, velocityValuesY] = [...velocity.matchAll(/-?\d+/g)]
      .flat()
      .map(Number);

    return {
      position: { x: positionValuesX, y: positionValuesY },
      velocity: { x: velocityValuesX, y: velocityValuesY }
    };
  });
  let min = null;
  for (let i = 0; i < 10000; i++) {
    if (min) {
      return min;
    }
    robots.forEach(({ position, velocity }) => {
      const yDiff = (position.y + velocity.y) % tall;
      const xDiff = (position.x + velocity.x) % wide;
      let newY = (yDiff < 0 ? tall + yDiff : yDiff) % tall;
      let newX = (xDiff < 0 ? wide + xDiff : xDiff) % wide;

      position.y = newY;
      position.x = newX;
    });

    const safety = calcSafety(robots, wide, tall);

    const g = printCurrentGrid(grid, robots);

    g.forEach((row) => {
      if (row.join('').includes('########')) {
        if (min === null) {
          min = i;
          printCurrentGrid(grid, robots, true);
        }
      }
    });
  }
  return min;
};

console.log('PART_1:   ', part1());

console.log('PART_2:   ', part2());
