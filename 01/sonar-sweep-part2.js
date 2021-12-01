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
  const first = input.slice(0, -2);
  const second = input.slice(1, -1);
  const third = input.slice(2);

  const aggregated = Array.from(
    { length: Math.min(first.length, second.length, third.length) },
    (_, i) => [first[i], second[i], third[i]]
  ).map((tuple) => tuple.reduce((total, current) => total + current, 0));

  const prev = aggregated.slice(0, -1);
  const next = aggregated.slice(1);

  return Array.from({ length: Math.min(prev.length, next.length) }, (_, i) => [
    prev[i],
    next[i],
  ]).reduce((count, [prev, next]) => (prev < next ? count + 1 : count), 0);
}
