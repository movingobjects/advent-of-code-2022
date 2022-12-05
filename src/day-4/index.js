
const {
  getInput,
  outputSolution
} = require('../utils');

const toRange = (rangeStr) => ({
  min: Number(rangeStr.split('-')[0]),
  max: Number(rangeStr.split('-')[1]),
})

const areEngulfing = ([a, b]) => {
  if (a.min >= b.min && a.max <= b.max) return true;
  if (b.min >= a.min && b.max <= a.max) return true;
  return false;
}

const areOverlapping = ([a, b]) => {
  if (a.min <= b.max && a.max >= b.min) return true;
  if (b.min <= a.max && b.max >= a.min) return true;
  return false;
}

const partners = getInput()
  .split('\n')
  .map((couple) => (
    couple
      .split(',')
      .map(toRange)
  ));

outputSolution(
  partners.filter(areEngulfing).length,
  partners.filter(areOverlapping).length
);

