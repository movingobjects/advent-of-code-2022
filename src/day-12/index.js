const chalk = require('chalk');

const {
  getInput,
  outputSolution
} = require('../utils');

const inputGrid = getInput()
  .split('\n')
  .map((row) => row.split(''));

const getCellId = (x, y) => `${x},${y}`;

// Converts map to graph (nodes + children)
const makeGraph = () => {

  const getMoveOpts = (x, y) => {

    const canMoveTo = (atX, atY, toX, toY) => {

      const toInt = (char) => {
        if (char == 'S') return 'a'.charCodeAt(0);
        if (char == 'E') return 'z'.charCodeAt(0);
        return char?.charCodeAt(0);
      };

      const at = inputGrid[atY]?.[atX],
        to = inputGrid[toY]?.[toX];

      if (!to) return false;
      if (at === 'E') return false;

      return (
        toInt(to) <= toInt(at) + 1
      );

    }

    const adjCells = [
      { x, y: y - 1 },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x: x + 1, y }
    ];

    return adjCells
      .filter((to) => canMoveTo(x, y, to.x, to.y))
      .map(({ x, y }) => getCellId(x, y));

  }

  const graph = { };

  inputGrid.forEach((row, y) => {
    row.forEach((col, x) => {
      graph[getCellId(x, y)] = {
        id: getCellId(x, y),
        val: col,
        x,
        y,
        opts: getMoveOpts(x, y),
        visited: false,
        fromNode: null
      }
    })
  });

  return graph;

}

const graph = makeGraph();

const getNodesByVal = (val) => {
  return Object.keys(graph)
    .filter((id) => graph[id]?.val === val)
    .map((id) => graph[id]);
}

const resetGraph = () => {
  Object.keys(graph)
    .forEach((id) => {
      graph[id].visited = false;
      graph[id].fromNode = null;
    })
}

const displayMap = (path) => {

  const lastMove = path.slice().pop();

  inputGrid.forEach((row, y) => {
    console.log(
      row
        .map((col, x) => {
          if (lastMove === getCellId(x, y)) {
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

// BFS approach to maze search
const getPath = (startNode, endNode) => {

  resetGraph();

  let node  = startNode,
      queue = [startNode];

  while (true) {

    // Dead end
    if (!queue.length) return null;

    // Get next node from queue
    node = queue.shift();

    // Completed!
    if (node.id === endNode.id) break;

    // Loop through valid moves from node
    node.opts.forEach((id) => {

      let toNode = graph[id];

      // Only record fromNode first time a node is reached.
      // Used for backtracking and determining optimized path.
      if (!toNode.fromNode) {
        toNode.fromNode = node;
      }

      // Add unvisited opts to queue
      if (!toNode.visited) {
        toNode.visited = true;
        queue.push(toNode);
      }

    });
  }

  const path = [];

  // Backtrack from end, fromNode in each node is most
  // efficient route back to start
  while (node.id !== startNode.id) {
    path.unshift(node.id);
    node = node.fromNode;
  }

  return path;

}

const getShortestPathFrom = (startVal) => {

  const startNodes = getNodesByVal(startVal);
  const endNode = getNodesByVal('E')[0];

  const shortestPath = startNodes
    ?.map((n) => getPath(n, endNode))
    ?.filter((path) => !!path)
    ?.sort((a, b) => b?.length - a?.length)
    ?.pop();

  displayMap(shortestPath);
  console.log(`Shortest path to 'E' from '${startVal}'\n\n`);

  return shortestPath.length;

}

outputSolution(
  getShortestPathFrom('S'),
  getShortestPathFrom('a'),
);

