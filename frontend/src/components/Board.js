import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';
import axios from '../api';
import {StepForwardOutlined, StepBackwardOutlined, HomeOutlined, RedoOutlined} from '@ant-design/icons';

let steps = [];
let index = 0;
// let currx;
// let curry;

const Board = ({ boardSize, backToHome, turn, time, currentUser}) => {

    // console.log(currx);
    const [board, setBoard] = useState([]);                     
    const [gameOver, setGameOver] = useState(false);            
    const [win, setWin] = useState(false);                      
    const [string, setString] = useState("Game Over");
    const [number, setNumber] = useState(0);
    //const [flag, setFlag] = useState(0);
    const [result, setResult] = useState(0);
    const [show, setShow] = useState(true);
    const [currx, setCurrx] = useState(20);
    const [curry, setCurry] = useState(20);

    if(turn == 2)
    {
        // currx = (boardSize - 1) / 2;
        // curry = (boardSize - 1) / 2;
        if(steps.length === 0){
            steps.push(((boardSize - 1) / 2) * 100 + ((boardSize - 1) / 2));
        }
        // if(steps.length === 1 && !gameOver)
        // {
        //     // setCurrx((boardSize - 1) / 2);
        //     // setCurry((boardSize - 1) / 2);
        // }
    } 

    // console.log(steps);

    //let change = 0;

    useEffect(() => {
        freshBoard();
    }, []);

    const freshBoard = () => {
        const newBoard = createBoard(boardSize, turn);
        setBoard(newBoard.board);
        let ele = document.getElementById('modal');
        ele.style.setProperty('opacity', '1');
        setCurrx(20);
        setCurry(20);
    }

    const restartGame = async () => {
        steps = [];
        index = 0;
        setCurrx(20);
        setCurry(20);
        await updateUser(result);
        freshBoard();
        //setFlag(0);
        // change = 0;
        setGameOver(false);
        setWin(false);
    }

    // const revealCell = (x, y) => {
    //     //console.log("hello");
    //     if(board[x][y].value !== 0) return;
    //     setBoard(old => {
    //         let newBoard = JSON.parse(JSON.stringify(old));
    //         newBoard[x][y].value = 1;
    //         check(newBoard);
    //         if(!gameOver)
    //         {
    //             callAI(newBoard);
    //             console.log(number);
    //             let r = number / 100, c = number % 100;
    //             newBoard[r][c].value = 2;
    //             check(newBoard);
    //         }
    //         return newBoard;
    //     });
    //     //console.log(newBoard[x][y].value);        
    //     //console.log(board[x][y].value);
    //     //check();
    //     /*if(!gameOver)
    //     {
    //         callAI();
    //         check();
    //     }*/
    // }

    const revealCell = (x, y) => {
        if(board[x][y].value !== 0 || gameOver) return;
        setCurrx(x);
        setCurry(y);
        if(steps.length === 0 || steps[steps.length - 1] !== 100 * x + y) steps.push(100 * x + y);
        setBoard(old => {
            let newBoard = JSON.parse(JSON.stringify(old));
            newBoard[x][y].value = 1;
            check(newBoard);
            callAI(newBoard);
            return newBoard;
        });
        /*let tempBoard = JSON.parse(JSON.stringify(board));
        tempBoard[x][y].value = 1;*/
        //callAI(tempBoard);
    }

    const callAI = async (board) => {
        console.log(boardSize);
        const {
            data: {x, y}, 
        } = await axios.get('/AI', {
            params: {
                board: board,
                boardSize: boardSize,
            },
        });
        setBoard(old => {
            let newBoard = JSON.parse(JSON.stringify(old));
            newBoard[x][y].value = 2;
            check(newBoard);
            return newBoard;
        });
        // console.log(currx);
        setCurrx(x);
        setCurry(y);
        // console.log(currx);
        if(steps.length === 0 || steps[steps.length - 1] !== 100 * x + y) steps.push(100 * x + y);
        // console.log(steps);
        //console.log(x, y);
        //setNumber(100 * x + y);
        //console.log(number);
        //return value;
    }

    /*useEffect(() => {
        console.log("hello");
        callAI(board);
    }, [revealCell]);*/

    const updateUser = async ( val ) => {
        console.log('hello');
        console.log(val);
        //console.log(flag);
        //if(flag === 1) return;
        const {
            data: { message },
          } = await axios.post('/standings', {
            name: currentUser,
            val: val,
          });
        //setFlag(1);
        // change = 1;
    }

    const check = async (board) => {
        console.log(boardSize);
        let {
            data: {message, status}, 
        } = await axios.get('/gameOver', {
            params: {
                board: board,
                boardSize: boardSize,
            },
        });
        //console.log(status);
        if(status === 1)
        {
            setGameOver(true);
            setWin(true);
            setString(message);
            //updateUser(1);
            setResult(1);
        }
        else if(status === 2)
        {
            setGameOver(true);
            setString(message);
            //updateUser(2);
            setResult(2)
        }
        else if(status === 3)
        {
            setGameOver(true);
            setString(message);
            //updateUser(3);
            setResult(3);
        }
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

    const backToHomeOnCLick = async () => {
        await updateUser(result);
        steps = [];
        index = 0;
        setCurrx(20);
        setCurry(20);
        backToHome();
    }

    //console.log(gameOver);

    const replay = () => {
        index = 0;
        setCurrx(20);
        setCurry(20);
        const newBoard = createBoard(boardSize, 1);
        setBoard(newBoard.board);
        let ele = document.getElementById('modal');
        ele.style.setProperty('opacity', '1');
        ele.style.setProperty('visibility', 'hidden');
        // let ele2 = document.getElementById('resign');
        // ele2.style.setProperty('visibility', 'hidden');
        console.log(steps);
    }

    const next = () => {
        if(index === steps.length)
        {
            let ele = document.getElementById('modal');
            ele.style.setProperty('visibility', 'visible');
            return;
        }
        let x = Math.floor(steps[index] / 100);
        let y = steps[index] % 100;
        setBoard(old => {
            let newBoard = JSON.parse(JSON.stringify(old));
            if(index % 2 === turn || index % 2 === turn - 2) newBoard[x][y].value = 1;
            else newBoard[x][y].value = 2;
            return newBoard;
        });
        index++;
    }

    const previous = () => {
        if(index === 0) return;
        index --;
        let x = Math.floor(steps[index] / 100);
        let y = steps[index] % 100;
        setBoard(old => {
            let newBoard = JSON.parse(JSON.stringify(old));
            newBoard[x][y].value = 0;
            return newBoard;
        });
    }

    const resign = () => {
        setGameOver(true);
        setString('You lose!');
        //updateUser(2);
        setResult(2);
    }

    const timesUp = () => {
        setGameOver(true);
        setString("Time's Up! You lose!");
        //updateUser(2);
        setResult(2);
    }

    return (
        <div className='boardPage' >       
            <div className='boardWrapper' >
                <div className='boardContainer'>
                <Dashboard gameOver={gameOver} win={win} remainTime={time * 60} timesUp={timesUp}></Dashboard>
                {
                    board.map((row, i) =>{
                        return(
                            <div style={{display: 'flex'}}>
                            {row.map((col, j) =>{
                                return (
                                    <Cell rowIdx={i} colIdx={j} detail={col} revealCell={revealCell} turn={turn} flag={(turn === 2 && steps.length === 1 && !gameOver && i === (boardSize - 1) / 2 && j === (boardSize - 1) / 2) ||currx === i && curry === j}>
                                        <text style={{visibility: board[i][j] !== 0 ? 'visible' : 'hidden' }}>{col.value}</text>
                                    </Cell>
                                );
                            })}
                            </div>
                        );
                    })
                }
                </div>
                <div className='replayWrapper' id = "wrap1" style={{visibility: gameOver ? 'visible' : 'hidden' }}>
                    <button className='replayBtn' onClick={replay}>Replay</button>
                    <button className='replayBtn' onClick={previous}><StepBackwardOutlined></StepBackwardOutlined> Prev</button>
                    <button className='replayBtn' onClick={next}><StepForwardOutlined></StepForwardOutlined> Next</button>
                </div>
                <div className='resignWrapper' id = "wrap2" style={{visibility: !gameOver ? 'visible' : 'hidden' }}>
                    <button className='replayBtn' onClick={resign}>Resign</button>
                </div>
            </div>
            <div className='modal' id = 'modal' style={{visibility: win || gameOver ? 'visible' : 'hidden' }}>
                <div className='modalWrapper'></div>
                <div className='modalContent'>
                    <div className='modalResult'>{string}</div>
                    <div className='modalBtnWrapper'>
                        <div className='modalBtn' onClick={restartGame}><RedoOutlined></RedoOutlined> Restart</div>
                        <div className='modalBtn' onClick={backToHomeOnCLick}><HomeOutlined></HomeOutlined> Home</div>
                        <div className='modalBtn' onClick={hide} style={{'opacity' : '1'}}>{show? 'Hide' : 'Show'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board

// bug: restart black 2nd red dot and steps