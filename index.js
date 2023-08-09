const board = document.getElementById('board');
    const cells = board.getElementsByTagName('td');
    let currentPlayer = 'X';
    let playerChosen = false;
    let isAutoPlayer= false;

    const gameState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    function choosePlayer(player) {
      currentPlayer = player;
      playerChosen = true;
      enableCells();
      
      if(currentPlayer==='o'){
          isAutoPlayer=true;
          setTimeout(makeAutoMove,500);
        }
    }
    function makeAutoMove() {
        if (!isAutoPlayer) {
          return; // Exit if not the automatic player's turn
        }
      
        const emptyCells = [];
      
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (gameState[row][col] === '') {
              emptyCells.push({ row, col });
            }
          }
        }
      
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];
          handleCellClick(randomCell.row, randomCell.col);
        }
      
        isAutoPlayer = false;
      }

    function enableCells() {
      for (let cell of cells) {
        cell.style.pointerEvents = 'pointer';
      }
    }

    function disableCells() {
      for (let cell of cells) {
        cell.style.pointerEvents = 'none';
      }
    }

    function checkWinner() {
      // Check rows, columns, and diagonals (similar to the previous implementation)
      // ...
      for (let row = 0; row < 3; row++) {
        if (
          gameState[row][0] === gameState[row][1] &&
          gameState[row][0] === gameState[row][2] &&
          gameState[row][0] !== ''
        ) {
          return gameState[row][0];
        }
      }
    
      // Check columns
      for (let col = 0; col < 3; col++) {
        if (
          gameState[0][col] === gameState[1][col] &&
          gameState[0][col] === gameState[2][col] &&
          gameState[0][col] !== ''
        ) {
          return gameState[0][col];
        }
      }
    
      // Check diagonals
      if (
        gameState[0][0] === gameState[1][1] &&
        gameState[0][0] === gameState[2][2] &&
        gameState[0][0] !== ''
      ) {
        return gameState[0][0];
      }
    
      if (
        gameState[0][2] === gameState[1][1] &&
        gameState[0][2] === gameState[2][0] &&
        gameState[0][2] !== ''
      ) {
        return gameState[0][2];
      }
    
      return null;
    }
    
    function checkDraw() {
      // Check for a draw (similar to the previous implementation)
      // ...
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (gameState[row][col] === '') {
            return false;
          }
        }
      }
      return true;
    }

    function handleCellClick(row, col) {
      if (!playerChosen) {
        alert("Please choose a player (X or O) first!");
        return;
      }

      if (gameState[row][col] === '' && !checkWinner() && !checkDraw()) {
        gameState[row][col] = currentPlayer;
        cells[row * 3 + col].innerText = currentPlayer;

        const winner = checkWinner();
        if (winner) {
          setTimeout(() => alert(`Player ${winner} wins!`), 100);
          disableCells();
        } else if (checkDraw()) {
          setTimeout(() => alert('It\'s a draw!'), 100);
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
    function handleRestart() {
        currentPlayer = 'X';
        playerChosen = false;
      
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            gameState[row][col] = '';
            cells[row * 3 + col].innerText = '';
          }
        }
      
        enableCells();
      }

    function handleClick(row, col) {
      handleCellClick(row, col);
    }
