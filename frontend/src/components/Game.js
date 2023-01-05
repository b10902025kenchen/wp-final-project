import './css/Board.css'
import Cell2 from './Cell2';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';
import axios from '../api';
import {StepForwardOutlined, StepBackwardOutlined, HomeOutlined,} from '@ant-design/icons';

const initArray = Array(9).fill(Array(9).fill(0));

const Game = ({startBattle, array, makeDecision, currentUser, rival, stageOnChange}) => {
    console.log(startBattle);
    let boardSize = 9, size = 9;
    console.log(array);
    const [board, setBoard] = useState(initArray);                     
    const [gameOver, setGameOver] = useState(false);            
    const [win, setWin] = useState(false);                      
    const [string, setString] = useState("Game Over");
    const [number, setNumber] = useState(0);
    //const [flag, setFlag] = useState(0);
    const [result, setResult] = useState(0);
    const [show, setShow] = useState(true);
    const [currx, setCurrx] = useState(20);
    const [curry, setCurry] = useState(20);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setBoard(array);
    }, [array]);

    console.log(board);

    useEffect(() => {
        let val = check();
        console.log(val);
        if(val === 1)
        {
            if(currentUser.localeCompare(rival) === 1)
            {
                setString("You win!");
                setWin(true);
                setAmount(100);
            }
            else
            {
                setString("You lose!");
                setAmount(-100);
            }
            setGameOver(true);
        }
        else if(val === 2)
        {
            if(currentUser.localeCompare(rival) === 1)
            {
                setString("You lose!");
                setAmount(-100);
            }
            else
            {
                setString("You win!");
                setWin(true);
                setAmount(100);
            }
            setGameOver(true);
        }
        else if(val === 3)
        {
            setString("Tie game!");
            setGameOver(true);
        }
    }, [board]);

    // const freshBoard = () => {
    //     const newBoard = createBoard(boardSize, 1);
    //     setBoard(newBoard.board);
    // }

    // useEffect(() => {
    //     setBoard(old => {
    //             let newBoard = JSON.parse(JSON.stringify(old));
    //             for(let i = 0; i < 9; i++)
    //             {
    //                 for(let j = 0; j < 9; j++)
    //                 {
    //                     newBoard[i][j].value = array[i][j];
    //                 }
    //             }
    //             // check(newBoard);
    //             // callAI(newBoard);
    //             return newBoard;
    //         });
    // }, [array]);

    function check()
    {
        let type = 0;
        let flag = 0;
        for(let i = 0; i < size; i++)
        {
            for(let j = 0; j < size; j++)
            {
                if(board[i][j] === 0) flag = 1;
                console.log(board[i][j]);
            }
        }
        if(flag === 0)
        {
            type = 3;
        }
        console.log(type);
        for(let i = 0; i < size; i++)
        {
            for(let j = 0; j < size - 4; j++)
            {
                if(board[i][j] === 1 && board[i][j+1] === 1 && board[i][j+2] === 1 && board[i][j+3] === 1 && board[i][j+4] === 1)
                {
                    type = 1;
                }
                if(board[i][j] === 2 && board[i][j+1] === 2 && board[i][j+2] === 2 && board[i][j+3] === 2 && board[i][j+4] === 2)
                {
                    type = 2;
                }
            }
        }
        for(let i = 0; i < size; i++)
        {
            for(let j = 0; j < size - 4; j++)
            {
                if(board[j][i] === 1 && board[j+1][i] === 1 && board[j+2][i] === 1 && board[j+3][i] === 1 && board[j+4][i] === 1)
                {
                    type = 1;
                }
                if(board[j][i] === 2 && board[j+1][i] === 2 && board[j+2][i] === 2 && board[j+3][i] === 2 && board[j+4][i] === 2)
                {
                    type = 2;
                }
            }
        }
        for(let i = 0; i < size - 4; i++)
        {
            for(let j = 0; j < size - 4; j++)
            {
                if(board[i][j] === 1 && board[i+1][j+1] === 1 && board[i+2][j+2] === 1 && board[i+3][j+3] === 1 && board[i+4][j+4] === 1)
                {
                    type = 1;
                }
                if(board[i][j] === 2 && board[i+1][j+1] === 2 && board[i+2][j+2] === 2 && board[i+3][j+3] === 2 && board[i+4][j+4] === 2)
                {
                    type = 2;
                }
            }
        }
        for(let i = 0; i < size - 4; i++)
        {
            for(let j = 4; j < size; j++)
            {
                if(board[i][j] === 1 && board[i+1][j-1] === 1 && board[i+2][j-2] === 1 && board[i+3][j-3] === 1 && board[i+4][j-4] === 1)
                {
                    type = 1;
                }
                if(board[i][j] === 2 && board[i+1][j-1] === 2 && board[i+2][j-2] === 2 && board[i+3][j-3] === 2 && board[i+4][j-4] === 2)
                {
                    type = 2;
                }
            }
        }
        return type;
    }

    function cal(num)
    {
        let count = 0;
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                if(board[i][j] === num)
                {
                    count++;
                }
            }
        }
        return count;
    }

    const revealCell = (x, y) => {
        //console.log(x, y);
        //console.log(currentUser, rival);
        console.log(board, x, y);
        console.log(board[x][y]);
        if(board[x][y] !== 0) return;
        if(currentUser.localeCompare(rival) === 1)
        {
            console.log(cal(1), cal(2));
            if(cal(1) !== cal(2)) return;
            makeDecision(1, x, y);
        }
        else 
        {
            console.log(cal(1), cal(2));
            if(cal(1) !== cal(2) + 1) return;
            makeDecision(2, x, y);
        }
        setBoard(array);
        // if(board[x][y].value !== 0 || gameOver) return;
        // // setCurrx(x);
        // // setCurry(y);
        // // if(steps.length === 0 || steps[steps.length - 1] !== 100 * x + y) steps.push(100 * x + y);
        // setBoard(old => {
        //     let newBoard = JSON.parse(JSON.stringify(old));
        //     newBoard[x][y].value = 1;
        //     // check(newBoard);
        //     // callAI(newBoard);
        //     return newBoard;
        // });
        // /*let tempBoard = JSON.parse(JSON.stringify(board));
        // tempBoard[x][y].value = 1;*/
        // //callAI(tempBoard);
    }

    const updateUser = async ( val ) => {
        console.log('hello');
        console.log(val);
        //console.log(flag);
        //if(flag === 1) return;
        const {
            data: { message },
          } = await axios.post('/battle', {
            name: currentUser,
            val: amount,
          });
        //setFlag(1);
        // change = 1;
    }

    const backToHomeOnCLick = async () => {
        // await updateUser(result);
        // steps = [];
        // index = 0;
        // setCurrx(20);
        // setCurry(20);
        await updateUser(amount);
        stageOnChange(0);
        //todo: delete game, update profile
    }

    const hide = () => {
        let ele = document.getElementById('modal');
        if(show) {
            ele.style.setProperty('opacity', '0.1');
            setShow(false);
        }
        else
        {
            ele.style.setProperty('opacity', '1');
            setShow(true);
        }
    }

    return (
        <div className='boardPage' style={{visibility: startBattle? 'visible' : 'hidden' }}>       
            <div className='boardWrapper' >
                <div className='boardContainer'>
                {/* <Dashboard gameOver={gameOver} win={win} remainTime={time * 60} timesUp={timesUp}></Dashboard> */}
                {
                    board.map((row, i) =>{
                        return(
                            <div style={{display: 'flex'}}>
                            {row.map((col, j) =>{
                                return (
                                    <Cell2 rowIdx={i} colIdx={j} detail={board[i][j]} revealCell={revealCell} >
                                        <text style={{visibility: board[i][j] !== 0 ? 'visible' : 'hidden' }}>{col.value}</text>
                                    </Cell2>
                                );
                            })}
                            </div>
                        );
                    })
                }
                </div>
                {/* <div className='replayWrapper' id = "wrap1" style={{visibility: gameOver ? 'visible' : 'hidden' }}>
                    <button className='replayBtn' onClick={replay}>Replay</button>
                    <button className='replayBtn' onClick={previous}><StepBackwardOutlined></StepBackwardOutlined> Prev</button>
                    <button className='replayBtn' onClick={next}><StepForwardOutlined></StepForwardOutlined> Next</button>
                </div>
                <div className='resignWrapper' id = "wrap2" style={{visibility: !gameOver ? 'visible' : 'hidden' }}>
                    <button className='replayBtn' onClick={resign}>Resign</button>
                </div> */}
            </div>
            <div className='modal' id = 'modal' style={{visibility: win || gameOver ? 'visible' : 'hidden' }}>
                <div className='modalWrapper'></div>
                <div className='modalContent'>
                    <div className='modalResult'>{string}</div>
                    <div className='modalBtnWrapper'>
                        {/* <div className='modalBtn' onClick={restartGame}>Restart</div> */}
                        <div className='modalBtn' onClick={backToHomeOnCLick}><HomeOutlined></HomeOutlined> Back to Home</div>
                        <div className='modalBtn' onClick={hide} style={{'opacity' : '1'}}>{show? 'Hide' : 'Show'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game