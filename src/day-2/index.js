
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve('./input.txt'), 'utf8');

const getSum = (vals) => (
  vals.reduce((sum, val) => sum + val, 0)
);

const toRPS = (moveVal) => {
  if (moveVal === 'A' || moveVal === 'X') return 'r';
  if (moveVal === 'B' || moveVal === 'Y') return 'p';
  if (moveVal === 'C' || moveVal === 'Z') return 's';
}
const toOutcome = (outcomeVal, oppMove) => {
  if (outcomeVal === 'X') return getLoseMove(oppMove);
  if (outcomeVal === 'Y') return getTieMove(oppMove);
  if (outcomeVal === 'Z') return getWinMove(oppMove);
}

const getWinMove = (move) => {
  if (move === 'r') return 'p';
  if (move === 'p') return 's';
  if (move === 's') return 'r';
}
const getTieMove = (move) => {
  if (move === 'r') return 'r';
  if (move === 'p') return 'p';
  if (move === 's') return 's';
}
const getLoseMove = (move) => {
  if (move === 'r') return 's';
  if (move === 'p') return 'r';
  if (move === 's') return 'p';
}

const getMovePts = (yourMove) => {
  if (yourMove === 'r') return 1;
  if (yourMove === 'p') return 2;
  if (yourMove === 's') return 3;
  return 0;
}
const getOutcomePts = (oppMove, yourMove) => {
  if (yourMove === getLoseMove(oppMove)) return 0;
  if (yourMove === getTieMove(oppMove)) return 3;
  if (yourMove === getWinMove(oppMove)) return 6;
  return 0;
}

const calcRoundScore = ({ oppMove, yourMove }) => (
  getMovePts(yourMove) + getOutcomePts(oppMove, yourMove)
)

const roundVals = input
  .split('\n')
  .map((r) => r.split(' '));

const part1Score = getSum(
  roundVals
    .map((vals) => ({
      oppMove: toRPS(vals[0]),
      yourMove: toRPS(vals[1])
    }))
    .map(calcRoundScore)
);

const part2Score = getSum(
  roundVals
    .map((vals) => ({
      oppMove: toRPS(vals[0]),
      yourMove: toOutcome(vals[1], toRPS(vals[0]))
    }))
    .map(calcRoundScore)
);

console.log(`
Part 1: ${part1Score}
Part 2: ${part2Score}
`);