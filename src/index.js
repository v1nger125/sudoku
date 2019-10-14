module.exports = solveSudoku;

function isSolved(matrix){
  for (const row of matrix) {
    for (const item of row) {
      if (item.length) return false;
    }
  }
  return true;
}

function canBeInRow(i, item, matrix){
  return !matrix[i].includes(item);
}
function canBeInColumn(j, item, matrix){
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][j] === item) return false;
  }
  return true;
}
function canBeInSquare(i, j, item, matrix){
  for (let rowIndex = i - (i % 3); rowIndex < i - (i % 3) + 3; rowIndex++) {
    for (let colIndex = j - (j % 3); colIndex < j - (j % 3) + 3; colIndex++) {
      if (matrix[rowIndex][colIndex] === item) return false;
    }
  }
  return true;
}

function isOneInRow(i, j, item, matrix){
  for (let colIndex = 0; colIndex < matrix[0].length; colIndex++) {
    if (matrix[i][colIndex].length && matrix[i][colIndex].includes(item) && colIndex != j) {
      return false;
    }
  }
  return true;
}
function isOneInCol(i, j, item, matrix){
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    if (matrix[rowIndex][j].length && matrix[rowIndex][j].includes(item) && rowIndex != i) {
      return false;
    }
  }
  return true;
}
function isOneInSquare(i, j, item, matrix){
  for (let rowIndex = i - (i % 3); rowIndex < i - (i % 3) + 3; rowIndex++) {
    for (let colIndex = j - (j % 3); colIndex < j - (j % 3) + 3; colIndex++) {
      if (matrix[rowIndex][colIndex].length && matrix[rowIndex][colIndex].includes(item) && (rowIndex != i || colIndex != j)) {
        return false;
      }
    }
  }
  return true;
}

function removeInRow(i, item, matrix){
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j].length && matrix[i][j].includes(item)) {
      matrix[i][j].splice(matrix[i][j].indexOf(item),1);
    }
  }
}
function removeInCol(j, item, matrix){
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][j].length && matrix[i][j].includes(item)) {
      matrix[i][j].splice(matrix[i][j].indexOf(item),1);
    }
  }
}
function removeInSquare(i, j, item, matrix){
  for (let rowIndex = i - (i % 3); rowIndex < i - (i % 3) + 3; rowIndex++) {
    for (let colIndex = j - (j % 3); colIndex < j - (j % 3) + 3; colIndex++) {
      if (matrix[rowIndex][colIndex].length && matrix[rowIndex][colIndex].includes(item)) {
        matrix[rowIndex][colIndex].splice(matrix[rowIndex][colIndex].indexOf(item),1);
      }
    }
  }
}

function solveSudoku(arr) {
  let matrix = arr.slice();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        matrix[i][j] = new Array();
        for (let index = 1; index <= 9; index++) {
          if (canBeInColumn(j, index, matrix) && canBeInRow(i, index, matrix) && canBeInSquare(i, j, index, matrix)){
            matrix[i][j].push(index);
          }
        }
      }
    }
  }
  let iterator = 0;
  while (!isSolved(matrix)) {
    iterator++;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j].length) {
          if(matrix[i][j].length == 1) {
            matrix[i][j] = matrix[i][j][0];
            removeInRow(i, matrix[i][j], matrix);
            removeInCol(j, matrix[i][j], matrix);
            removeInSquare(i, j, matrix[i][j], matrix);
          }
          else {
            for (let index = 0; index < matrix[i][j].length; index++) {
              if(isOneInRow(i, j, matrix[i][j][index], matrix)) {
                matrix[i][j] = matrix[i][j][index];
                removeInCol(j, matrix[i][j], matrix);
                removeInSquare(i, j, matrix[i][j], matrix);
              }
              else if (isOneInCol(i, j, matrix[i][j][index], matrix)) {
                matrix[i][j] = matrix[i][j][index];
                removeInRow(i, matrix[i][j], matrix);
                removeInSquare(i, j, matrix[i][j], matrix);
              }
              else if(isOneInSquare(i, j, matrix[i][j][index], matrix)) {
                matrix[i][j] = matrix[i][j][index];
                removeInRow(i, matrix[i][j], matrix);
                removeInCol(j, matrix[i][j], matrix);
              }
            }
          }
        }
      }
    }
    if(iterator > 100) break;
  }
  console.log(matrix);
  return matrix;
}
