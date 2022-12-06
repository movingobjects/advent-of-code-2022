
const {
  getInput,
  outputSolution
} = require('../utils');

const inputChars = getInput()
  .split('');

const repeatsChars = (chars) => (
  chars.some((char, i) => (
    chars.lastIndexOf(char) !== i
  ))
)

const getAns = (distictCount) => {
  return distictCount + inputChars.findIndex((char, i) => (
    !repeatsChars(inputChars.slice(i, i + distictCount))
  ));
}

outputSolution(
  getAns(4),
  getAns(14)
);
