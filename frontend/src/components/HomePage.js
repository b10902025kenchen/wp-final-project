import './css/HomePage.css';
import React, { useState, useEffect } from 'react';
import Intro from '../components/Intro';
import { TrophyOutlined, PlayCircleOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const HomePage = ({ stageOnChange, startGameOnClick, LogOut, currentUserOnChange, currentUser}) => {              

  const handleClick = () => {
    startGameOnClick();
    // boardSizeOnChange(board_size);
    // timeOnChange(tempTime);
    // turnOnChange(tempTurn);
  }

  const handleClick2 = () => {
    stageOnChange(1);
  }

  const handleClick3 = () => {
    stageOnChange(2);
  }

  const handleLogOut = () => {
    LogOut();
    currentUserOnChange('');
  }

  const handleClick4 = () => {
    stageOnChange(10);
  }

  //TODO: control panel
  
  return (
    <div className='HomeWrapper'>
      {/* <button className="button" onClick={handleLogOut}>Log Out</button> */}
      <div className='IntroWrapper'>
        <Intro currentUser={currentUser}></Intro>
      </div>
      <p className='title'>GoBang!</p>
      <div className='btnWrapper'>
        {/* <Button>Start Game</Button> */}
        <button className="btn" onClick={handleClick4}><TrophyOutlined></TrophyOutlined> Battle</button>
        <button className="btn" onClick={handleClick}><PlayCircleOutlined></PlayCircleOutlined> Play</button>
        <button className="btn" onClick={handleClick2}><ProfileOutlined></ProfileOutlined> Profile</button>
        <button className="btn" onClick={handleClick3}><SettingOutlined></SettingOutlined> Settings</button>
        <button className="btn" onClick={handleLogOut}><LogoutOutlined></LogoutOutlined> Log Out</button>
      </div>
    </div>
  );

}
export default HomePage;   