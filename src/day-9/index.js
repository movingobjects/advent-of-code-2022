
const {
  times,
  uniq
} = require('lodash');

const {
  getInput,
  outputSolution
} = require('../utils');

const moves = getInput()
  .trim()
  .split('\n')
  .map((l) => ({
    dir: l.split(' ')[0],
    dist: l.split(' ')[1]
  }));

const getAns = (len) => {

  let rope    = [],
      tailXYs = [];

  times(len, () => rope.push({
    x: 0,
    y: 0
  }));

  moves.forEach(({ dir, dist }) => {

    const updateKnot = (index) => {

      const knot     = rope[index],
            knotPrev = rope[index - 1];

      if (!knotPrev) {
        // Rope head
        if (dir === 'U') knot.y -= 1;
        if (dir === 'R') knot.x += 1;
        if (dir === 'D') knot.y += 1;
        if (dir === 'L') knot.x -= 1;

      } else {
        // Not rope head
        const distX  = knotPrev.x - knot.x,
              distY  = knotPrev.y - knot.y,
              isFarX = Math.abs(distX) > 1,
              isFarY = Math.abs(distY) > 1;

        if (isFarX || isFarY) {
          knot.x += Math.sign(distX);
          knot.y += Math.sign(distY);
        }

      }

    }

    const saveTailXY = () => {
      const { x, y } = rope.slice().pop();
      tailXYs = uniq([
        ...tailXYs,
        `${x},${y}`
      ])
    }

    times(dist, () => {
      times(rope.length, updateKnot)
      saveTailXY();
    });

  })

  return tailXYs.length;

}

outputSolution(
  getAns(2),
  getAns(10)
);

