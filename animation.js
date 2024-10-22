function showNumberWithAnimation(i, j, randNumber) {
  var numberCell = $("#number-cell-" + i + "-" + j);

  numberCell.css("background-color", getNumberBgc(randNumber));
  numberCell.css("color", getNumberColor(randNumber));
  numberCell.text(randNumber);

  numberCell.animate(
    {
      // 属性,持续时间
      width: "100px",
      height: "100px",
      top: getPosTop(i, j),
      left: getPosLeft(i, j)
    },
    50
  );
}

function showMoveAnimation(fromX, fromY, toX, toY) {
  var numberCell = $("#number-cell" + fromX + "-" + fromY);
  numberCell.animate(
    {
      top: getPosTop(toX, toY),
      left: getPosLeft(toX, toY)
    },
    200
  );
}

function updateScore(score) {
  $("#score").text(score);
}
