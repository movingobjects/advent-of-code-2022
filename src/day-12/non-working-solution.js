const chalk = require('chalk');

const {
  getInput,
  outputSolution
} = require('../utils');

const grid = getInput()
  .split('\n')
  .map((l) => l
    .split('')
  );

const canMoveTo = (atX, atY, toX, toY, prev = []) => {

  const toInt = (char) => {
    if (char == 'S') return 'a'.charCodeAt(0) - 97;
    if (char == 'E') return 'z'.charCodeAt(0) - 97;
    return char?.charCodeAt(0) - 97;
  };

  // Don't move to previous location
  if (prev.some(({ x: prevX, y: prevY }) => (
    prevX === toX &&
    prevY === toY
  ))) return false;

  const at = grid[atY]?.[atX],
    to = grid[toY]?.[toX];

  // Off-grid
  if (!to) return false;

  // Start
  if (at === 'S') return true;
  if (to === 'S') return false;

  // End
  if (at === 'E') return false;

  return (
    Math.abs(toInt(at) - toInt(to)) <= 1
  );

}

const displayGrid = (atX, atY) => {

  grid.forEach((chars, row) => {
    console.log(
      chars
        .map((char, col) => {
          if (col === atX && row === atY) {
            return chalk.red(char)
          } else {
            return chalk.gray(char);
          }
        })
        .join('')
    );
  })
  console.log('');

}

const solutions = [];

const getPath = (x = 0, y = 0, prev = []) => {

  const char = grid[y]?.[x];

  if (char === 'E') {
    solutions.push(prev);
    return;
  }

  const moveOpts = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y }
  ];

  return {
    cell: { x, y },
    moves: moveOpts
      .filter((to) => canMoveTo(x, y, to.x, to.y, prev))
      .map((to) => getPath(to.x, to.y, [
        ...prev,
        { x: to.x, y: to.y }
      ]))

  }

}

const getShortestPath = () => {
  getPath()
  return solutions
    .map((s) => s.length)
    .sort((a, b) => a - b)
    .shift();
}

// console.log(JSON.stringify(getPath()));

console.log(getShortestPath());
