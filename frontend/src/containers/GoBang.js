import './GoBang.css';
import Board from '../components/Board';
import React, { useState } from 'react';
import HomePage from '../components/HomePage';
import Settings from '../components/settings';
import Profile from '../components/profile';
import JoinGame from '../components/JoinGame';

const GoBang = ({LogOut, currentUserOnChange, currentUser}) => {
    const [startGame, setStartGame] = useState(false);      
    const [boardSize, setBoardSize] = useState(13);     
    const [time, setTime] = useState(10);
    const [turn, setTurn] = useState(1);     

    const [stage, setStage] = useState(0);

    const startGameOnClick = () => {
        setStartGame(true);
        //alert(setStartGame);
    }

    const boardSizeOnChange = (value) => {
        setBoardSize(value);
    }

    const timeOnChange = (value) => {
        setTime(value);
    }

    const turnOnChange = (value) => {
        setTurn(value);
    }

    const backToHomeOnClick = () => {
        setStartGame(false);
    }

    const stageOnChange = (value) => {
        setStage(value);
        console.log(value);
    }

    return (
        <div className='goBang'>
            { stage === 10 ? <JoinGame currentUser={currentUser} stageOnChange={stageOnChange}></JoinGame> :
            stage === 1 ? <Profile currentUser={currentUser} stageOnChange={stageOnChange}></Profile> : 
            stage === 2 ? <Settings stageOnChange={stageOnChange} boardSizeOnChange={boardSizeOnChange} timeOnChange={timeOnChange} turnOnChange={turnOnChange}></Settings> :
            startGame? <Board boardSize={boardSize} backToHome={backToHomeOnClick} turn={turn} time={time} currentUser={currentUser}></Board>:
            <HomePage stageOnChange={stageOnChange} startGameOnClick={startGameOnClick} LogOut={LogOut} currentUserOnChange={currentUserOnChange} currentUser={currentUser}></HomePage>
            }
        </div>
    );
}
export default GoBang;

//TODO: settings