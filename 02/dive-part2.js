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
    aim: 0,
    horizontal: 0,
    depth: 0,
  };

  function getActionForCommand({ direction, units }) {
    switch (direction) {
      case "down":
        return ({ aim, ...rest }) => ({ ...rest, aim: aim + units });
      case "up":
        return ({ aim, ...rest }) => ({ ...rest, aim: aim - units });
      case "forward":
        return ({ aim, horizontal, depth }) => ({
          aim,
          horizontal: horizontal + units,
          depth: depth + aim * units,
        });
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
