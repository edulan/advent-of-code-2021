exports.transpose = (array) =>
  array[0].map((_, index) => array.map((row) => row[index]));

exports.unique = (array) => [...new Set(array)];

exports.not =
  (fn) =>
  (...args) =>
    !fn(...args);

exports.sum = (array) => array.reduce((total, value) => total + value, 0);
