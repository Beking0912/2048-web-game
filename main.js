var board = new Array();
var score = 0;

$(document).ready(function() {
  newGame();
});

function newGame() {
  init(); // 初始化棋盘格
  getOneNumber(); // 随机产生一个数字
  getOneNumber(); // 随机产生一个数字
}

function init() {
  // 初始化 生成 4*4 格子布局
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      var cell = $("#cell-" + i + "-" + j);
      cell.css("top", getPosTop(i, j));
      cell.css("left", getPosLeft(i, j));
    }

  // 使 board 成为一个二维数组
  for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }

  updateBoardView();
}

function updateBoardView() {
  $(".number-cell").remove(); // 移除所有已存在的 number-cell 元素
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      $("#container").append(
        '<div class="number-cell" id="number-cell-' + i + "-" + j + '"></div>'
      );
      var theNumberCell = $("#number-cell-" + i + "-" + j); // 操作当前坐标下的 number-cell 的值

      if (board[i][j] === 0) {
        theNumberCell.css("width", "0px");
        theNumberCell.css("height", "0px");
        theNumberCell.css("top", getPosTop(i, j) + 50);
        theNumberCell.css("left", getPosLeft(i, j) + 50);
      } else {
        theNumberCell.css("width", "100px");
        theNumberCell.css("height", "100px");
        theNumberCell.css("top", getPosTop(i, j));
        theNumberCell.css("left", getPosLeft(i, j));
        theNumberCell.css("background-color", getNumberBgc(board[i][j]));
        theNumberCell.css("color", getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
    }
}

function getOneNumber() {
  if (noSpace(board)) return false;

  // 随机一个位置
  var randX = parseInt(Math.floor(Math.random() * 4)); // floor 向下取整 (1,2,3,4)
  var randY = parseInt(Math.floor(Math.random() * 4));
  while (true) {
    if (board[randX][randY] === 0) break; // 若随机位置上无元素
    // 若随机位置上已有元素 则重新随机
    randX = parseInt(Math.floor(Math.random() * 4));
    randY = parseInt(Math.floor(Math.random() * 4));
  }

  // 随机一个数字 2和4的概率相同
  var randNumber = Math.random() < 0.5 ? 2 : 4;

  // 随机位置显示随机数字
  board[randX][randY] = randNumber;
  showNumberWithAnimation(randX, randY, randNumber);

  return true;
}

$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 37: // left
      if (moveLeft()) {
        // 是否有元素可以向左移动
        setTimeout("getOneNumber()", 210); // 随机生成一个数字
        setTimeout("isGameOver()", 300); // 游戏是否已结束
      }
      break;
    case 38: // up
      if (moveUp()) {
        setTimeout("getOneNumber()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    case 39: // right
      if (moveRight()) {
        setTimeout("getOneNumber()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    case 40: // down
      if (moveDown()) {
        setTimeout("getOneNumber()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    default:
      // 其他按键无反应
      break;
  }
});

function isGameOver() {
  if (noSpace(board) && noMove(board)) {
    gameOver();
  }
}

function gameOver() {
  alert("game over~");
}

function moveLeft() {
  if (!canMoveLeft(board)) return false; // 能否向左移动

  // 左边有无数字？ 左边的数字是否与自己相等？
  for (var i = 0; i < 4; i++)
    for (var j = 1; j < 4; j++) {
      if (board[i][j] !== 0) {
        for (var k = 0; k < j; k++)
          if (board[i][k] === 0 && noBlockH(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[i][k] === board[i][j] && noBlockH(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            continue;
          }
      }
    }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveRight() {
  if (!canMoveRight(board)) return false;

  for (var i = 0; i < 4; i++)
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] !== 0) {
        for (var k = 3; k > j; k--)
          if (board[i][k] === 0 && noBlockH(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[i][k] === board[i][j] && noBlockH(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] *= 2;
            board[i][j] = 0;
            continue;
          }
      }
    }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveUp() {
  if (!canMoveUp(board)) return false;

  for (var j = 0; j < 4; j++)
    for (var i = 1; i < 4; i++) {
      if (board[i][j] !== 0) {
        for (var k = 0; k < i; k++)
          if (board[k][j] === 0 && noBlockV(j, k, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[k][j] === board[i][j] && noBlockV(j, k, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] *= 2;
            board[i][j] = 0;
            continue;
          }
      }
    }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveDown() {
  if (!canMoveDown(board)) return false;

  for (var j = 0; j < 4; j++)
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] !== 0) {
        for (var k = 3; k > i; k--)
          if (board[k][j] === 0 && noBlockV(j, i, k, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[k][j] === board[i][j] && noBlockV(j, i, k, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] *= 2;
            board[i][j] = 0;
            continue;
          }
      }
    }
  setTimeout("updateBoardView()", 200);
  return true;
}
