export default (boardSize, turn) => {
    //console.log(turn);
    //console.log(boardSize / 2);
    //console.log()
    let board = [];

    // Print Board function (For testing)
    const printBoard = () => {
        console.log("Current Board")
        for (let x = 0; x < boardSize; x++) {
            console.log(board[x].map((x) => {
                return (x.value)
            }))
        }
    }

    for (let x = 0; x < boardSize; x++) {
        let subCol = [];
        for (let y = 0; y < boardSize; y++) {
            subCol.push({
                value: 0,  //0: blank, 1:human, 2:AI 
                x: x,                       
                y: y,                       
            });
        }
        board.push(subCol);
    }

    if(turn === 2)
    {
        board[(boardSize - 1) / 2][(boardSize - 1) / 2].value = 2;
    }

    printBoard();

    return { board };
};