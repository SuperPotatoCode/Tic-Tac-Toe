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

})