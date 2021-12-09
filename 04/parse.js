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

function parse(input) {
  return {
    numbers: parseNumbers(input[0]),
    boards: parseBoards(input.slice(1)),
  };
}

exports.parse = parse;
