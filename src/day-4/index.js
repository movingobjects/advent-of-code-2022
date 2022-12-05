
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve('./input.txt'), 'utf8');

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

const couples = input
  .split('\n')
  .map((couple) => (
    couple
      .split(',')
      .map(toRange)
  ));

const part1Sum = couples.filter(areEngulfing).length;
const part2Sum = couples.filter(areOverlapping).length;

console.log(`
Part 1: ${part1Sum}
Part 2: ${part2Sum}
`);
