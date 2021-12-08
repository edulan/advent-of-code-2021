#!/usr/bin/env node
const readline = require("readline");
const { transpose, unique, not } = require("../utils");

const lines = [];

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

function run(input) {
  function parseNumbers(line) {
    return line.split(",").map((value) => parseInt(value));
  }

  function parseBoardLine(line) {
    return line
      .trim()
      .split(/\s+/)
      .map((value) => parseInt(value));
  }

  function parseBoards(lines) {
    if (lines.length === 0) {
      return [];
    }

    const boardLines = lines.slice(1, 6);
    const restLines = lines.slice(6);
    const board = boardLines.map(parseBoardLine);

    return [board, ...parseBoards(restLines)];
  }

  const numbers = parseNumbers(input[0]);
  const boards = parseBoards(input.slice(1));
  const boardsRowsAndColumns = boards.map((board) => [
    ...board,
    ...transpose(board),
  ]);

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

    const markedBoardRowsAndColumns = boardsRowsAndColumns.map((board) =>
      board.map((line) =>
        line.filter((lineNumber) => lineNumber !== currentNumber)
      )
    );

    if (
      markedBoardRowsAndColumns.length === 1 &&
      isWinnerBoard(markedBoardRowsAndColumns[0])
    ) {
      return [markedBoardRowsAndColumns[0], currentNumber];
    }

    const notWinnerBoards = markedBoardRowsAndColumns.filter(
      not(isWinnerBoard)
    );

    return findLastWinnerBoard(notWinnerBoards, restNumbers);
  }

  const [lastWinnerBoard, number] = findLastWinnerBoard(
    boardsRowsAndColumns,
    numbers
  );
  const unmarkedBoardNumbers = unique(lastWinnerBoard.flat(2));
  const unmarkedBoardNumbersSum = unmarkedBoardNumbers.reduce(
    (total, boardNumber) => total + boardNumber,
    0
  );

  return unmarkedBoardNumbersSum * number;
}
