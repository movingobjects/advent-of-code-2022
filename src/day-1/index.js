
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve('./input.txt'), 'utf8');

const getSum = (vals) => (
  vals.reduce((sum, val) => sum + val, 0)
);

const elfCals = input
  .split('\n\n')
  .map((val) => val.split('\n').map(Number))
  .map(getSum)
  .sort((a, b) => a - b);

console.log(`
Part 1: ${getSum(elfCals.slice(-1)) }
Part 2: ${getSum(elfCals.slice(-3)) }
`);
