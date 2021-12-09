#!/usr/bin/env node
const readline = require("readline");

exports.readInput = (run) => {
  let lines = [];

  readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    })
    .on("line", function (line) {
      lines.push(line);
    })
    .on("close", function () {
      console.log(run(lines));
    });
};
