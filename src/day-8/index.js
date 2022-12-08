
const {
  getInput,
  outputSolution
} = require('../utils');

const trees = getInput()
  .split('\n')
  .map((l) => l.split(''))

const getViewDistUp = (c, r) => {
  let count = 0;
  for (let row = r - 1; row >= 0; row--) {
    count++;
    if (trees[row][c] >= trees[r][c]) break;
  }
  return count;
}
const getViewDistRight = (c, r) => {
  let count = 0;
  for (let col = c + 1; col < trees[r].length; col++) {
    count++;
    if (trees[r][col] >= trees[r][c]) break;
  }
  return count;
}
const getViewDistDown = (c, r) => {
  let count = 0;
  for (let row = r + 1; row < trees.length; row++) {
    count++;
    if (trees[row][c] >= trees[r][c]) break;
  }
  return count;
}
const getViewDistLeft = (c, r) => {
  let count = 0;
  for (let col = c - 1; col >= 0; col--) {
    count++;
    if (trees[r][col] >= trees[r][c]) break;
  }
  return count;
}

const getIsVisibleUp = (c, r) => {
  for (let row = r - 1; row >= 0; row--) {
    if (trees[row][c] >= trees[r][c]) return false;
  }
  return true;
}
const getIsVisibleRight = (c, r) => {
  for (let col = c + 1; col < trees[r].length; col++) {
    if (trees[r][col] >= trees[r][c]) return false;
  }
  return true;
}
const getIsVisibleDown = (c, r) => {
  for (let row = r + 1; row < trees.length; row++) {
    if (trees[row][c] >= trees[r][c]) return false;
  }
  return true;
}
const getIsVisibleLeft = (c, r) => {
  for (let col = c - 1; col >= 0; col--) {
    if (trees[r][col] >= trees[r][c]) return false;
  }
  return true;
}

const getTreeDistScore = (c, r) => {
  const s = (
    getViewDistUp(c, r) *
    getViewDistRight(c, r) *
    getViewDistDown(c, r) *
    getViewDistLeft(c, r)
  )
  return s;
}

const getPart1Ans = () => {

  let count = 0;

  for (let r = 0; r < trees.length; r++) {
    for (let c = 0; c < trees[r].length; c++) {
      const isVisible = (
        getIsVisibleUp(c, r) ||
        getIsVisibleRight(c, r) ||
        getIsVisibleDown(c, r) ||
        getIsVisibleLeft(c, r)
      )
      if (isVisible) count++;
    }
  }

  return count;

}

const getPart2Ans = () => {

  let maxScore = -1;

  for (let r = 0; r < trees.length; r++) {
    for (let c = 0; c < trees[r].length; c++) {
      const score = getTreeDistScore(c, r);
      maxScore = Math.max(score, maxScore);
    }
  }

  return maxScore;

}

outputSolution(
  getPart1Ans(),
  getPart2Ans()
);
