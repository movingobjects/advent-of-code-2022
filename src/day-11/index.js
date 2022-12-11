
const {
  times
} = require('lodash');

const {
  getInput,
  getProduct,
  outputSolution
} = require('../utils');

const getAns = (roundCount, divideBy3) => {

  const monkeys = getInput()
    .split('\n\n')
    .map((data) => {

      const lines = data.split('\n');

      return {
        items: lines[1].split(': ')[1].split(', ').map(Number),
        operation: lines[2].split('new = ')[1],
        divisorTest: Number(lines[3].split(' by ')[1]),
        indexTrue: Number(lines[4].split('monkey ')[1]),
        indexFalse: Number(lines[5].split('monkey ')[1]),
        inspections: 0
      }

    });

  const worryReducer = getProduct(monkeys.map((m) => m.divisorTest));

  times(roundCount, () => {
    monkeys.forEach((monkey) => {

      while (!!monkey?.items?.length) {

        const old = monkey.items.shift();
        let worry = eval(monkey?.operation);

        if (divideBy3) {
          worry = Math.floor(worry / 3);
        }

        worry = worry % worryReducer;

        monkey.inspections++;

        const catchingMonkey = (worry % monkey.divisorTest)
          ? monkeys[monkey.indexFalse]
          : monkeys[monkey.indexTrue];

        catchingMonkey?.items?.push(worry);

      }

    })

  })

  return getProduct(
    monkeys
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)
  )

}

outputSolution(
  getAns(20, true),
  getAns(10000, false)
);


