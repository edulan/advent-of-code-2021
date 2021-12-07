#!/usr/bin/env node
const readline = require("readline");

const lines = [];

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
  .on("line", function (line) {
    lines.push([...line]);
  })
  .on("close", function () {
    console.log(run(lines));
  });

function run(input) {
  const transposed = input[0].map((_, colIndex) =>
    input.map((row) => row[colIndex])
  );
  const frequencies = transposed.map((column) =>
    column.reduce(
      (groups, bit) => {
        groups[bit] += 1;

        return groups;
      },
      { 0: 0, 1: 0 }
    )
  );
  const mostCommon = frequencies
    .reduce((acum, stats) => [...acum, stats["0"] > stats["1"] ? "0" : "1"], [])
    .join("");
  const leastCommon = frequencies
    .reduce((acum, stats) => [...acum, stats["0"] < stats["1"] ? "0" : "1"], [])
    .join("");

  const gammaRate = parseInt(mostCommon, 2);
  const epsilonRate = parseInt(leastCommon, 2);

  return gammaRate * epsilonRate;
}
