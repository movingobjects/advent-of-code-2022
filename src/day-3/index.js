
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve('./input.txt'), 'utf8');
const { chunk } = require('lodash');

const getSum = (vals) => (
  vals.reduce((sum, val) => sum + val, 0)
);

const getSharedItem = (...arrays) => {
  for (let char of arrays[0]) {
    if (arrays.every((a) => a.indexOf(char) !== -1)) {
      return char;
    }
  }
  return null;
}

const getItemPriority = (item) => {

  let charVal = item.charCodeAt(0) - 96;

  if (charVal < 1) {
    charVal += 58;
  }

  return charVal;

}

const sacks = input.split('\n');

const part1Sums = sacks.map((sack) => {

  const indexHalf = Math.ceil(sack.length / 2),
        comp1     = sack.slice(0, indexHalf),
        comp2     = sack.slice(indexHalf);

  const sharedItem = getSharedItem(comp1, comp2);

  return getItemPriority(sharedItem);

});

const part2Groups = chunk(sacks, 3);

const part2Sums = part2Groups.map((group) => (
  getItemPriority(getSharedItem(...group))
));

console.log(`
Part 1: ${getSum(part1Sums)}
Part 2: ${getSum(part2Sums)}
`);

