const fs = require('fs');
const md5 = require('md5');
const process = require('process');
const { fork } = require('child_process');
const chalk = require('chalk');

const [ , , watchPath, ...args ] = process.argv;

if (!watchPath || !watchPath.length) {
  console.log('usage: node live-reload [target_file] [args]');
  return;
}

console.log(`Watching for file changes on ${chalk.green(watchPath)}`);

let md5Prev = null;
let fsWait = false;

fs.watch(watchPath, (event, filename) => {
  if (filename) {

    if (fsWait) return;

    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);

    const md5Cur = md5(fs.readFileSync(watchPath));

    if (md5Cur !== md5Prev) {
      md5Prev = md5Cur;

      console.log('\n');

      runScript(watchPath, args, (err) => {
        if (err) {
          console.log(chalk.red(`\n× ${err}`));
        } else {
          console.log(chalk.green(`\n✓ ${watchPath}`));
        }
      });
    }

  }
});

function runScript(path, args, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var cProcess = fork(path, args);

  // listen for errors as they may prevent the exit event from firing
  cProcess.on('error', (err) => {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  cProcess.on('exit', (code) => {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });

}
