const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { fork } = require('child_process');

const getDayOpts = (basePath) => (
  fs.readdirSync(path.resolve(basePath), { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((f) => ({
      name: f.name,
      value: `${basePath}/${f.name}`
    }))
);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'cwd',
      message: 'Which day?',
      choices: getDayOpts('src')
    }
  ])
  .then((answers) => {
    console.log('\n');
    fork(
      path.resolve('scripts/live-reload'),
      [ 'index.js' ],
      {
        cwd: answers.cwd
      }
    )

  })
