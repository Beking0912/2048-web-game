function getPosTop(i, j) {
  return 20 + 120 * i;
}

function getPosLeft(i, j) {
  return 20 + 120 * j;
}

function getNumberBgc(number) {
  switch (number) {
    case 2:
      return "#e3f2fd";
      break;
    case 4:
      return "#bbdefb";
      break;
    case 8:
      return "#90caf9";
      break;
    case 16:
      return "#64b5f6";
      break;
    case 32:
      return "#42a5f5";
      break;
    case 64:
      return "#2196f3";
      break;
    case 128:
      return "#1e88e5";
      break;
    case 256:
      return "#1976d2";
      break;
    case 512:
      return "#1565c0";
      break;
    case 1024:
      return "#0d47a1";
      break;
    case 2048:
      return "#1a237e";
      break;
    // case 4096:return 'rgb(240, 201, 207)';break;
    // case 8192:return 'rgb(240, 201, 207)';break;
  }
}

function getNumberColor(number) {
  if (number <= 16) return "#0d47a1";
  return "white";
}

function noSpace(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false; // 棋盘格上还有空间
    }
  return true;
}

function noMove(board) {
  if (
    canMoveDown(board) ||
    canMoveLeft(board) ||
    canMoveRight(board) ||
    canMoveUp(board)
  )
    return false;
  return true;
}

function canMoveLeft(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      if (board[i][j] !== 0)
        if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j])
          return true;
    }
  return false;
}

function canMoveRight(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] !== 0)
        if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])
          return true;
    }
  return false;
}

function canMoveUp(board) {
  for (var j = 0; j < 4; j++)
    for (var i = 1; i < 4; i++) {
      if (board[i][j] !== 0)
        if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])
          return true;
    }
  return false;
}

function canMoveDown(board) {
  for (var j = 0; j < 4; j++)
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] !== 0)
        if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])
          return true;
    }
  return false;
}

function noBlockH(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++) if (board[row][i] !== 0) return false;
  return true;
}

function noBlockV(col, row1, row2, board) {
  for (var i = row1 + 1; i < row2; i++) if (board[i][col] !== 0) return false;
  return true;
}
