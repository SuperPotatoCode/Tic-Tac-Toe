window.addEventListener('DOMContentloaded', ()=> {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.result');

    let board = ['','','','','','','','','',];
    let currentPlayer = 'X';
    let isGameActive = true;

    const xWin = 'Player X Won';
    const oWin = 'Player O Won';
    const t = 'Tied Up Potatoes';

    //Win Conditions 
    // [0][1][2]
    // [3][4][5]
    // [6][7][8]

    const winConditions = [
        [0][1][2], 
        [3][4][5],
        [6][7][8],
        [0][3][6],
        [1][4][7],
        [2][5][8],
        [0][4][8],
        [2][4][6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for(let i = 0; i <=7; i++){
            const winCondition =winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[0]];
            const c = board[winCondition[0]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
            roundWon = true;
            break;
            }
        }   
    

        if(roundWon){
            result(currentPlayer === 'X' ? xWin : oWin);
            isGameActive = false;
            return
        }

        if(!board.includes(''))
            result(t)

    }

    const result = (type) => {
        switch(type){
            case xWin:
                result.innerHTML = `Player <span class="playerX">X</span> won`;
                break;
            case oWin:
                result.innerHTML = `Player <span class="playerO">O</span> won`;
                break;
            case t:
                result.innerHTML = `Tie`;
        }
        result.classList.remove('hide')
    }

    const isValidAction = tile => {
        if(tile.innerText === "X" || tile.innerText === "O"){
            return false;
        }
        return true; 
    }

    const updateBoard = index => {
        board[index] = currentPlayer;  
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`); 
    } 

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

    resetButton.addEventListener('click', resetBoard); 


    const resetBoard = () => {
        board = ['','','','','','','','',''];
        currentPlayer = 'X';
        isGameActive = true;
        result.classList.add('hide');
        tiles.innerText = '';
    }
    
    if(currentPlayer === 'O'){
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO'); 
    })
})