#!/usr/bin/env node
const { readInput } = require("../io");
const { parse } = require("./parse");
const { transpose, unique, not, sum } = require("../utils");

function isWinnerBoard(board) {
  return board.some((line) => line.length === 0);
}

function findLastWinnerBoard(
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

  if (
    unmarkedBoardRowsAndColumns.length === 1 &&
    isWinnerBoard(unmarkedBoardRowsAndColumns[0])
  ) {
    return [unmarkedBoardRowsAndColumns[0], currentNumber];
  }

  const notWinnerBoards = unmarkedBoardRowsAndColumns.filter(
    not(isWinnerBoard)
  );

  return findLastWinnerBoard(notWinnerBoards, restNumbers);
}

readInput((input) => {
  const { numbers, boards } = parse(input);
  const boardsRowsAndColumns = boards.map((board) => [
    ...board,
    ...transpose(board),
  ]);

  const [lastWinnerBoard, number] = findLastWinnerBoard(
    boardsRowsAndColumns,
    numbers
  );
  const unmarkedBoardNumbers = unique(lastWinnerBoard.flat(2));
  const unmarkedBoardNumbersSum = sum(unmarkedBoardNumbers);

  return unmarkedBoardNumbersSum * number;
});
