
const {
  getInput,
  outputSolution
} = require('../utils');

const parseStacks = (data) => {

  const lines = data.split('\n');
  lines.pop();

  const stacks = [];

  lines.forEach((l) => {
    for (let i in l) {

      const stackIndex = Math.floor((i - 1) / 4),
            stackChar  = l[i];
            isChar = !((i - 1) % 4) && stackChar !== ' ';

      if (!stacks[stackIndex] && stackIndex >= 0) {
        stacks[stackIndex] = [];
      }

      if (isChar) {
        stacks[stackIndex].push(stackChar);
      }

    }
  });

  return stacks;

}

const applyMoves = (stacks, input, moveManyAtOnce) => {

  const applyMove = (count, indexFrom, indexTo) => {
    if (moveManyAtOnce) {
      stacks[indexTo].unshift(
        ...stacks[indexFrom].splice(0, count)
      );
    } else {
      for (let i = 0; i < count; i++) {
        stacks[indexTo].unshift(
          stacks[indexFrom].shift()
        );
      }
    }
  }

  input.split('\n').forEach((l, i) => {
    const parts = l.split(' ');
    applyMove(
      Number(parts[1]),
      Number(parts[3]) - 1,
      Number(parts[5]) - 1
    );
  });

  return stacks;

}

const getAns = (stacks) => stacks
  .map((s) => s.shift())
  .join('');

const [
  stacksInput,
  movesInput
] = getInput().split('\n\n');

const part1Ans = getAns(applyMoves(
  parseStacks(stacksInput),
  movesInput,
  false
));

const part2Ans = getAns(applyMoves(
  parseStacks(stacksInput),
  movesInput,
  true
));

outputSolution(
  part1Ans,
  part2Ans
);
