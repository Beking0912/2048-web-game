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
  if (nospace(board)) return false;

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
