const {
  getInput,
  getSum,
  outputSolution
} = require('../utils');

const elfCals = getInput()
  .split('\n\n')
  .map((val) => val.split('\n').map(Number))
  .map(getSum)
  .sort((a, b) => a - b);

outputSolution(
  getSum(elfCals.slice(-1)),
  getSum(elfCals.slice(-3))
);

