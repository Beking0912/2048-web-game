var board = new Array();
var score = 0;

$(document).ready(function() {
  newGame();
});

function newGame() {
  init();
}

function init() {
  // 初始化 生成 4*4 格子布局
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      var cell = $("#cell-" + i + "-" + j);
      cell.css("top", getPosTop(i, j));
      cell.css("left", getPosLeft(i, j));
    }
}
