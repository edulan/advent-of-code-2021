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
  const transpose = (array) =>
    array[0].map((_, index) => array.map((row) => row[index]));

  const makeFindRate = (selectSignificantBit) =>
    function findRate(data, columnIndex = 0) {
      if (data.length === 1) {
        return data[0];
      }

      const columnBitFrequencies = transpose(data).map((column) =>
        column.reduce(
          (frequencies, bit) => ({
            ...frequencies,
            [bit]: frequencies[bit] + 1,
          }),
          { 0: 0, 1: 0 }
        )
      );
      const columnSignificantBits = columnBitFrequencies.reduce(
        (acum, stats) => [
          ...acum,
          selectSignificantBit(stats["0"], stats["1"]),
        ],
        []
      );
      const filteredData = data.filter(
        ([...bits]) => bits[columnIndex] === columnSignificantBits[columnIndex]
      );

      return findRate(filteredData, columnIndex + 1);
    };

  const findOxigenGeneratorRate = makeFindRate(
    (zerosFrequency, onesFrequency) =>
      zerosFrequency > onesFrequency ? "0" : "1"
  );
  const findCarbonDioxideScrubberRate = makeFindRate(
    (zerosFrequency, onesFrequency) =>
      zerosFrequency <= onesFrequency ? "0" : "1"
  );

  const oxigenGeneratorRateBits = findOxigenGeneratorRate(input);
  const carbonDioxideScrubberRateBits = findCarbonDioxideScrubberRate(input);

  const oxigenGeneratorRate = parseInt(oxigenGeneratorRateBits.join(""), 2);
  const carbonDioxideScrubberRate = parseInt(
    carbonDioxideScrubberRateBits.join(""),
    2
  );

  return oxigenGeneratorRate * carbonDioxideScrubberRate;
}
