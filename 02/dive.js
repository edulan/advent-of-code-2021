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
    const [direction, units] = line.split(" ");

    lines.push({
      direction,
      units: parseInt(units, 10),
    });
  })
  .on("close", function () {
    console.log(run(lines));
  });

function run(input) {
  const initialState = {
    horizontal: 0,
    depth: 0,
  };

  function getActionForCommand({ direction, units }) {
    switch (direction) {
      case "forward":
        return ({ horizontal, ...rest }) => ({
          ...rest,
          horizontal: horizontal + units,
        });
      case "down":
        return ({ depth, ...rest }) => ({ ...rest, depth: depth + units });
      case "up":
        return ({ depth, ...rest }) => ({ ...rest, depth: depth - units });

      default:
        return (state) => state;
    }
  }

  const { horizontal, depth } = input.reduce(
    (state, command) => getActionForCommand(command)(state),
    initialState
  );

  return horizontal * depth;
}
