var content = document.querySelector('.container');
var button = document.querySelector('button');
$(button).addClass('btn btn-primary btn-circle btn-xl');

function addTable(row, col, cellsToPlay = new Set()) {
  var table = document.createElement('table');
  for (let i = 0; i < row; i++) {
    var tr = document.createElement('tr');
    for (let j = 0; j < col; j++) {
      var td = document.createElement('td');
      td.appendChild(document.createElement('button'));
      tr.appendChild(td);
      cellsToPlay.add(`${i}-${j}`);
    }
    table.appendChild(tr);
  }
  return [table, cellsToPlay];
}

// var createTable = addTable(6, 7);
// var table1 = createTable[0];
// var cellsToPlay = createTable[1];
// var rowNum = table1.children.length;
// var colNum = table1.children[0].children.length;
// table1.setAttribute('id', 'table1');
// content.appendChild(table1);

function changeColor(rowIndex, colIndex, color) {
  $('#table1 tr')
    .eq(rowIndex)
    .find('td')
    .eq(colIndex)
    .find('button')
    .css('background-color', color);
}

function currentCellColor(rowIndex, colIndex) {
  return $('#table1 tr')
    .eq(rowIndex)
    .find('td')
    .eq(colIndex)
    .find('button')
    .css('background-color');
}

function isGameOver(rowIndex, colIndex, colNum) {
  let sameColorCells = 1;
  let color = currentCellColor(rowIndex, colIndex);

  for (let i = colIndex - 1; i >= 0; i--) {
    if (currentCellColor(rowIndex, i) == color) {
      sameColorCells++;
      if (sameColorCells == 4) return true;
    } else {
      break;
    }
  }

  for (let j = colIndex + 1; j < colNum; j++) {
    if (currentCellColor(rowIndex, j) == color) {
      sameColorCells++;
      if (sameColorCells == 4) return true;
    } else {
      break;
    }
  }

  return false;
}
// var color = $(this)
//   .find('button')
//   .css('background-color');
// if (color === 'rgb(167, 170, 175)') {
//   $(this)
//     .find('button')
//     .css('background-color', '#25e838');
//   console.log('changing color');
// }
// }

// var tds = document.querySelectorAll('td');
// for (let td of tds) {
//   td.addEventListener('click', changeColor);
// }
//
// var trs = document.querySelectorAll('tr');
// for (let tr of trs) {
//   console.log(tr.rowIndex);
// }

// var player1, player2, currentPlayer, color, replay;

button.addEventListener('click', () => {
  $(button).remove();

  var rowCount = prompt('Enter the row number you would like for the board');
  var colCount = prompt('Enter the column number you would like for the board');

  var createTable = addTable(rowCount, colCount);
  var table1 = createTable[0];
  var cellsToPlay = createTable[1];
  var rowNum = table1.children.length;
  var colNum = table1.children[0].children.length;
  table1.setAttribute('id', 'table1');
  content.appendChild(table1);
  var tds = document.querySelectorAll('td');

  var player1 = prompt('Please enter player1 name');
  var player2 = prompt('Please enter player2 name');
  var currentPlayer = player1;
  var color = 'red';
  var gameOver = false;
  var replay;

  $('h4')
    .eq(0)
    .after(`<h2>${currentPlayer}: It is your turn to play.</h2>`);

  for (let td of tds) {
    td.addEventListener('click', () => {
      // var rowIndex = $(td)
      //   .closest('tr')
      //   .index();
      var rowIndex;
      var colIndex = td.cellIndex;
      for (let i = rowNum - 1; i >= 0; i--) {
        var cellColor = $('#table1 tr')
          .eq(i)
          .find('td')
          .eq(colIndex)
          .find('button')
          .css('background-color');

        if (cellColor === 'rgb(167, 170, 175)') {
          rowIndex = i;
          break;
        }
      }

      // var currentColor = $('#table1 tr')
      //   .eq(rowIndex)
      //   .find('td')
      //   .eq(colIndex)
      //   .find('button')
      //   .css('background-color');

      // if (currentPlayer == player1 && currentColor === 'rgb(167, 170, 175)') {
      if (currentPlayer == player1 && !gameOver && rowIndex + 1) {
        changeColor(rowIndex, colIndex, 'red');
        cellsToPlay.delete(`${rowIndex}-${colIndex}`);
        currentPlayer = player2;
      } else if (
        currentPlayer == player2 &&
        !gameOver &&
        rowIndex + 1 //&&
        // currentColor === 'rgb(167, 170, 175)'
      ) {
        changeColor(rowIndex, colIndex, 'green');
        cellsToPlay.delete(`${rowIndex}-${colIndex}`);
        currentPlayer = player1;
      }

      console.log(rowIndex, colIndex);
      console.log(colNum);
      console.log(isGameOver(rowIndex, colIndex, colNum));
      console.log(cellsToPlay);
      if (
        (rowIndex + 1 && isGameOver(rowIndex, colIndex, colNum)) ||
        cellsToPlay.size == 0
      ) {
        gameOver = true;
      }

      console.log(gameOver);

      if (!gameOver) {
        $('h4')
          .next()
          .html(`${currentPlayer}: It is your turn to play.`);
      } else if (!replay) {
        let message;
        if (cellsToPlay.size == 0 && !isGameOver(rowIndex, colIndex, colNum)) {
          message = 'Game over. Nobody won.';
        } else {
          let winner = currentPlayer == player1 ? player2 : player1;
          message = `Game over. ${winner} won!`;
        }

        $('h4')
          .next()
          .html(message)
          .after(
            '<button id="replay" class="btn btn-primary">Play again!</button>'
          );

        replay = document.getElementById('replay');
        replay.addEventListener('click', () => {
          location.reload();
        });
      }
    });
  }
});
