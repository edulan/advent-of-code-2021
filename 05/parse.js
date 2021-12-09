exports.parse = (input) =>
  input.map((line) =>
    line.split("->").map((part) =>
      part
        .trim()
        .split(",")
        .map((value) => parseInt(value))
    )
  );
