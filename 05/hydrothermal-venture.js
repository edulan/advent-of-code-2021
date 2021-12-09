#!/usr/bin/env node
const { readInput } = require("../io");
const { parse } = require("./parse");

const expandPath = ([[startX, startY], [endX, endY]]) =>
  Array.from(
    { length: Math.max(Math.abs(endX - startX), Math.abs(endY - startY)) + 1 },
    (_, i) => [
      startX + Math.sign(endX - startX) * i,
      startY + Math.sign(endY - startY) * i,
    ]
  );

readInput((input) => {
  const paths = parse(input);

  const pointFrequencies = paths
    .filter(
      ([[startX, startY], [endX, endY]]) => startX === endX || startY === endY
    )
    .map((path) => expandPath(path))
    .flatMap((path) => path.map(([start, end]) => `${start}-${end}`))
    .reduce((frequencies, point) => {
      frequencies[point] = (frequencies[point] || 0) + 1;

      return frequencies;
    }, {});

  return Object.values(pointFrequencies).filter((overlaps) => overlaps > 1)
    .length;
});
