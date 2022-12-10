
const {
  getInput,
  getSum,
  outputSolution
} = require('../utils');

let lines = getInput()
  .split('\n');

let x = 1,
    cycleIndex = 1,
    lineIndex = 0,
    isAdding = false,
    display = '\n#';

const strengths = [];

const onCycle = () => {

  const l = lines[lineIndex];

  if (!((cycleIndex - 20) % 40)) {
    strengths.push(cycleIndex * x)
  }

  if (l.startsWith('addx')) {
    if (isAdding) {
      x += Number(l.split(' ')[1]);
    } else {
      lineIndex--;
    }
    isAdding = !isAdding;
  }

  const isLit = Math.abs(x - ((cycleIndex) % 40)) <= 1;
  display += isLit ? '#' : '.';

  cycleIndex++;
  lineIndex++;

}

while (lineIndex < lines.length) {
  onCycle();
}

outputSolution(
  getSum(strengths),
  display
);

