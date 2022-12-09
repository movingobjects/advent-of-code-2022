
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

const sign = (n) => {
  return (n > 0) ? 1 : ((n < 0) ? -1 : 0);
}


const getAns = (ropeLen) => {

  let rope = [];
  let tailPosRecord = [];

  times(ropeLen, () => rope.push([0, 0]));

  moves.forEach(({ dir, dist }) => {

    const updateT = (index) => {

      const t = rope[index],
            h = rope[index - 1];

      if (index === 0) {
        if (dir === 'U') t[1] -= 1;
        if (dir === 'R') t[0] += 1;
        if (dir === 'D') t[1] += 1;
        if (dir === 'L') t[0] -= 1;
        return;
      }

      const distX = h[0] - t[0],
            distY = h[1] - t[1];

      if (h[0] === t[0]) {
        if (Math.abs(distY) > 1) {
          t[1] += sign(h[1] - t[1]);
        }
      } else if (h[1] === t[1]) {
        if (Math.abs(distX) > 1) {
          t[0] += sign(h[0] - t[0]);
        }
      } else {
        if (Math.abs(distX) > 1 || Math.abs(distY) > 1) {
          t[0] += sign(h[0] - t[0]);
          t[1] += sign(h[1] - t[1]);
        }
      }

    }

    const recordTailPos = () => {
      const [ x, y ] = rope.slice().pop();
      tailPosRecord = uniq([
        ...tailPosRecord,
        `${x},${y}`
      ])
    }

    times(dist, (i) => {
      times(rope.length, (i) => {
        updateT(i)
      })
      recordTailPos();
    });

  })

  return tailPosRecord.length;

}

outputSolution(
  getAns(2),
  getAns(10)
);

