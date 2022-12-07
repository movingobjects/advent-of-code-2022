
const { uniq } = require('lodash');

const {
  getInput,
  getSum,
  outputSolution
} = require('../utils');

const fileSys = {
  dirs: { },
  files: []
};
const allDirs = [[]];

const getFileSysNode = (path) => {
  let node = fileSys;
  path.forEach((dir) => {
    if (!node.dirs[dir]) {
      node.dirs[dir] = {
        dirs: {},
        files: []
      };
    }
    node = node?.dirs?.[dir];
  });
  return node;
}

const getDirSize = (path) => {

  const {
    dirs,
    files
  } = getFileSysNode(path);

  const filesSize = getSum(files.map((f) => f.size));
  const dirsSize = getSum(
    Object.keys(dirs)
      .map((d) => getDirSize([...path, d]))
  );

  return (
    filesSize + dirsSize
  )

}

const buildFileSys = () => {

  let curPath = [];

  const cd = (dir) => {
    if (dir === '/') {
      curPath = [];
    } else if (dir === '..') {
      curPath.pop();
    } else {
      curPath.push(dir);
    }
  }

  const updateFileSys = (files) => {
    const fsNode = getFileSysNode(curPath);

    const newDirs = files
      .filter((f) => f.startsWith('dir '))
      .map((d) => d.slice(4));

    newDirs.forEach((d) => {
      fsNode.dirs[d] = {
        dirs: {},
        files: []
      };
      allDirs.push([...curPath, d])
    })

    const newFiles = files
      .filter((f) => !f.startsWith('dir '))
      .map((f) => ({
        filename: f.split(' ')[1],
        size: Number(f.split(' ')[0])
      }))

    fsNode.files = uniq([
      ...fsNode.files,
      ...newFiles
    ]);

  }

  const actions = getInput()
    .split('$ ')
    .filter((a) => !!a.length);

  actions.forEach((a) => {

    const results = a
      .split('\n')
      .filter((r) => !!r.length);

    const cmd = results.shift();

    if (cmd.startsWith('cd')) {
      cd(cmd.slice(3));
      updateFileSys([]);

    } else if (cmd === 'ls') {
      updateFileSys(results);
    }

  });

}

const TOTAL_SPACE = 70000000,
      NEEDED_SPACE = 30000000;

buildFileSys();

const dirSizes = allDirs
  .map((d) => getDirSize(d))
  .sort((a, b) => a - b);

const part1Ans = getSum(
  dirSizes.filter((s) => s <= 100000)
);

const part2Ans = dirSizes.find((s) => s >= (NEEDED_SPACE - TOTAL_SPACE) + getDirSize([]))

outputSolution(
  part1Ans,
  part2Ans
);
