let scores, gamePlaying, activePlayer, gameState;
const gameInfo = document.getElementById('turn');
gameInfo.textContent = '';
scores = [0, 0];
activePlayer = 'X'

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = activePlayer;
    clickedCell.textContent = activePlayer;
}

function nextPlayer() {
    activePlayer = activePlayer === 'X' ? 'O' : 'X';
    gameInfo.textContent = `Player ${activePlayer}'s turn`;
}

function gameInit() {
    gamePlaying = true;
    activePlayer = 'X';
    gameInfo.textContent = `Player ${activePlayer}'s turn`;
    gameState = ['', '', '', '', '', '', '', '', ''];

    document.querySelectorAll('.item').forEach(cell => cell.innerHTML = "");
    document.querySelector('.game-container').classList.remove('show-new-game');
    document.getElementById('playerOnePoints').textContent = scores[0];
    document.getElementById('playerTwoPoints').textContent = scores[1];
}

document.querySelector('.new-game-btn').addEventListener('click', gameInit);
document.querySelectorAll('.item').forEach(item => item.addEventListener('click', handleClickedCell));

function handleClickedCell(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Number(clickedCell.getAttribute('data-cell-index'));

    // check if the cell isn't already clicked
    if(gameState[clickedCellIndex] !== '' || !gamePlaying) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function resultValidation() {
    let roundWon = false;

    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }

        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        gameInfo.innerHTML = `Player ${activePlayer} has won!`;
        activePlayer === 'X' ? scores[0]++ : scores[1]++;
        gamePlaying = false;
        document.querySelector('.game-container').classList.add('show-new-game');
        document.getElementById('playerOnePoints').textContent = scores[0];
        document.getElementById('playerTwoPoints').textContent = scores[1];
        return;
    }

    let roundDraw = !gameState.includes('');

    if(roundDraw) {
        gamePlaying = false;
        gameInfo.textContent = 'No winner this round!';
        console.log(`Draw!`);
        return;
    }

    nextPlayer();
}
