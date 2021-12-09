#!/usr/bin/env node
const { readInput } = require("../io");
const { parse } = require("./parse");
const { transpose, unique, sum } = require("../utils");

function isWinnerBoard(board) {
  return board.some((line) => line.length === 0);
}

function findWinnerBoard(
  boardsRowsAndColumns,
  [currentNumber, ...restNumbers]
) {
  if (currentNumber === undefined) {
    return [[], -1];
  }

  const unmarkedBoardRowsAndColumns = boardsRowsAndColumns.map((board) =>
    board.map((line) =>
      line.filter((lineNumber) => lineNumber !== currentNumber)
    )
  );

  if (unmarkedBoardRowsAndColumns.some(isWinnerBoard)) {
    return [unmarkedBoardRowsAndColumns.find(isWinnerBoard), currentNumber];
  }

  return findWinnerBoard(unmarkedBoardRowsAndColumns, restNumbers);
}

readInput((input) => {
  const { numbers, boards } = parse(input);
  const boardsRowsAndColumns = boards.map((board) => [
    ...board,
    ...transpose(board),
  ]);

  const [winnerBoard, number] = findWinnerBoard(boardsRowsAndColumns, numbers);
  const unmarkedBoardNumbers = unique(winnerBoard.flat(2));
  const unmarkedBoardNumbersSum = sum(unmarkedBoardNumbers);

  return unmarkedBoardNumbersSum * number;
});
