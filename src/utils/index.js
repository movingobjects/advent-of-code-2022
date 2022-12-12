const fs = require('fs');
const path = require('path');

const getInput = () => {
  return fs.readFileSync(path.resolve('./input.txt'), {
    encoding: 'utf-8'
  });
}

const writeToFile = (val, filename) => {
  fs.writeFileSync(
    path.resolve(`./${filename}`),
    JSON.stringify(val, null, 2),
    {
      encoding: 'utf-8'
    }
  )
}

const getSum = (vals) => (
  vals.reduce((a, val) => a + val)
);
const getDifference = (vals) => (
  vals.reduce((a, val) => a - val)
);
const getProduct = (vals) => (
  vals.reduce((a, val) => a * val)
);
const getQuotient = (vals) => (
  vals.reduce((a, val) => a / val)
);

const outputSolution = (ans1, ans2) => {
  console.log(`\nSOLUTION\n\nPart 1: ${ans1}\n\nPart 2: ${ans2}\n`);
}

module.exports = {
  getInput,
  writeToFile,
  getSum,
  getDifference,
  getProduct,
  getQuotient,
  outputSolution
}
