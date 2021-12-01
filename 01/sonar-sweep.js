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
    lines.push(parseInt(line, 10));
  })
  .on("close", function () {
    console.log(run(lines));
  });

function run(input) {
  const prev = input.slice(0, -1);
  const next = input.slice(1);

  return Array.from({ length: Math.min(prev.length, next.length) }, (_, i) => [
    prev[i],
    next[i],
  ]).reduce((count, [prev, next]) => (prev < next ? count + 1 : count), 0);
}

// function makePairs([prev, ...rest]) {
//   if (!prev) return [];

//   const [next] = rest;

//   return [[prev, next], ...makePairs(rest)];
// }

// function countIncreasingPairs([pair, ...rest]) {
//   if (!pair) return 0;

//   const [prev, next] = pair;

//   if (prev < next) return 1 + countIncreasingPairs(rest);

//   return countIncreasingPairs(rest);
// }
