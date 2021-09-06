module.exports = function solveSudoku(matrix) {
  let emptySpaceArr = emptySpaces(matrix);

  for (let i = 0; i < emptySpaceArr.length;) {
    let rowNum = emptySpaceArr[i][0];
    let columnNum = emptySpaceArr[i][1];
    let counter = matrix[rowNum][columnNum];
    let found = false;

    while (!found && counter <= 9) {
      if (checkColumn(matrix, columnNum, counter) && checkRow(matrix, rowNum, counter) && checkSqr(matrix, columnNum, rowNum, counter)) {
        matrix[rowNum][columnNum] = counter;
        counter++;
        found = true;
        i++;
      } else {
        counter++;
      }
    }
      if (!found) {
        matrix[rowNum][columnNum] = 0;
        i--;
      }
  }
  return matrix;

  function emptySpaces(matrix) {
    let toReturn = [];

    matrix.forEach((row, rowNum) => {
      row.forEach((colVal, columnNum) => {
        if (colVal === 0) {
          toReturn.push([rowNum, columnNum]);
        }
      })
    });
    return toReturn;
  }

  function checkColumn(matrix, columnNum, counter) {
    let i = 0;
    while (i < matrix.length) {
      if (matrix[i][columnNum] === counter) return false;
      i += 1;
    }
    return true;
  }

  function checkRow(matrix, rowNum, counter) {
    let i = 0;
    while (i < matrix.length) {
      if (matrix[rowNum][i] === counter) return false;
      i += 1;
    }
    return true;
  }

  function checkSqr(board, column, row, value) {
    let columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }
}
