const chalk = require('chalk');
const _ = require('lodash');

const {
  getInput,
  outputSolution
} = require('../utils');

const inputGrid = getInput()
  .split('\n')
  .map((row) => row.split(''));

const getCellId = (x, y) => `${x},${y}`;

const getMoveOpts = (x, y) => {

  const canMoveTo = (atX, atY, toX, toY) => {

    const toInt = (char) => {
      if (char == 'S') return 'a'.charCodeAt(0);
      if (char == 'E') return 'z'.charCodeAt(0);
      return char?.charCodeAt(0);
    };

    const at = inputGrid[atY]?.[atX],
          to = inputGrid[toY]?.[toX];

    // Off-grid
    if (!to) return false;

    // Start
    if (at === 'S') return true;
    if (to === 'S') return false;

    // End
    if (at === 'E') return false;

    return (
      toInt(to) <= toInt(at) + 1
    );

  }

  const opts = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y }
  ];
  return opts
    .filter((to) => canMoveTo(x, y, to.x, to.y))
    .map(({ x, y }) => getCellId(x, y))
}

const makeGraph = () => {

  const graph = { };

  inputGrid.forEach((row, y) => {
    row.forEach((col, x) => {
      graph[getCellId(x, y)] = {
        id: getCellId(x, y),
        val: col,
        x,
        y,
        opts: getMoveOpts(x, y)
      }
    })
  });
  return graph;

}

const graph = makeGraph();

const getNodesByVal = (val) => {
  return Object
    .keys(graph)
    .filter((id) => graph[id]?.val === val)
    .map((id) => graph[id]);
}

const resetGraph = () => {
  return Object
    .keys(graph)
    .forEach((id) => {
      graph[id].visited = false;
      graph[id].prevNode = null;
    })
}

const getPath = (startNode, endNode) => {

  resetGraph();

  let node = startNode;

  const queue = [startNode];

  while (true) {

    if (!queue.length) return null;

    node = queue.shift();
    node.visited = true;

    if (node.id === endNode.id) {
      break;
    }

    node.opts.forEach((id) => {

      let toNode = graph[id];

      if (!toNode.prevNode) {
        toNode.prevNode = node;
      }

      if (!toNode.visited) {
        toNode.visited = true;
        queue.push(toNode);
      }

    });
  }

  const path = [];

  while (node.id !== startNode.id) {
    path.unshift(node.id);
    node = node.prevNode;
  }

  return path;

}

const displayMap = (path) => {

  const lastItem = path.slice().pop();

  inputGrid.forEach((row, y) => {
    console.log(
      row
        .map((col, x) => {
          if (lastItem === getCellId(x, y)) {
            return chalk.red(col)
          } else if (path.includes(getCellId(x, y))) {
            return chalk.green(col)
          } else {
            return chalk.gray(col);
          }
        })
        .join('')
    );
  })
  console.log('');

}

const getBestPathLen = (startVal) => {

  const startNodes = getNodesByVal(startVal);
  const endNode = getNodesByVal('E')[0];

  const bestPath = startNodes
    ?.map((n) => (
      getPath(n, endNode)
    ))
    ?.filter((p) => !!p)
    ?.sort((a, b) => b?.length - a?.length)
    ?.pop();

  displayMap(bestPath);
  console.log(`Path to E from best start value '${startVal}'\n\n`);

  return bestPath.length;

}

outputSolution(
  getBestPathLen('S'),
  getBestPathLen('a'),
);

