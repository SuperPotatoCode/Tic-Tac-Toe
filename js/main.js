//checks to make sure the window is loaded up and code is valid 
window.addEventListener('DOMContentLoaded', () => {
//delcarations of necessary variables
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.result');

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const t = 'TIE';

    //Board Reference and winning conditions
    // [0][1][2]
    // [3][4][5]
    // [6][7][8]

    const winningConditions = [
        [0,1,2], 
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
//checks for winning conditions, who won the game, and updates the board
    function handleResultValidation() {
        let roundWon = false;
        for(let i = 0; i <=7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
            roundWon = true;
            break;
            }
        }   

        if(roundWon){
            result(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if(!board.includes(''))
            result(t)

    }
//the end result or announcer that shows a winner or tie
    const result = (type) => {
        switch(type){
            case PLAYERX_WON:
                announcer.innerHTML = `Player <span class="playerX">X</span> won`;
                break;
            case PLAYERO_WON:
                announcer.innerHTML = `Player <span class="playerO">O</span> won`;
                break;
            case t :
                announcer.innerText = `Tie`;
        }
        announcer.classList.remove('hide')
    }
//checks that the array or tile that was pressed is actually a blank array to then be able to change the current player
    const isValidAction = (tile) => {
        if(tile.innerText === "X" || tile.innerText === "O"){
            return false;
        }
        return true; 
    }
//current player makes the board appear as the player (X or O)
    const updateBoard = (index) => {
        board[index] = currentPlayer;  
    }
//while changing the player, checks for who was the current player and then the new current player should be the other player.
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`); 
    } 
//Changes player when a tile is clicked. 
    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer(); 
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile,index));
    });

    
//reset button resets the board and makes player go back to 'X' 
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');
      
        if(currentPlayer === 'O'){
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO'); 
        })  
    }
//Reset button 
    resetButton.addEventListener('click', resetBoard); 
})