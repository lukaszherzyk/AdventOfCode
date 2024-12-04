// Read input and split into lines
let input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
let grid = input.trim().split('\n');

// Function to perform one cycle
function cycle() {
  let newGrid = [];
  for (let i = 0; i < grid[0].length; i++) {
    newGrid.push([]);
    for (let j = 0; j < grid.length; j++) {
      newGrid[i].push(grid[j][i]);
    }
    newGrid[i] = newGrid[i]
      .reverse()
      .join('')
      .split('#')
      .map((group) =>
        group
          .split('')
          .sort((a, b) => b.localeCompare(a))
          .join('')
      )
      .join('#');
  }
  grid = newGrid;
}

// Initialize variables
let seen = new Set([grid.join('')]);
let array = [grid.join('')];
let iter = 0;

// Main loop
while (true) {
  iter++;
  cycle();

  // Convert grid to string representation and check for repetition
  let gridString = grid.map((row) => row.join('')).join('');
  if (seen.has(gridString)) {
    break;
  }

  seen.add(gridString);
  array.push(gridString);
}

// Find the first occurrence of the repeated pattern
let first = array.indexOf(grid.join(''));

// Calculate the final grid after 1,000,000,000 iterations
let finalGrid = array[((1000000000 - first) % (iter - first)) + first];

// Convert the final grid string back to an array of rows
grid = finalGrid.match(/.{1,${grid[0].length}}/g);
