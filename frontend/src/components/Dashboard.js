import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"

export default function Dashboard({ remainTime, gameOver, win, timesUp }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    console.log(time);
    console.log(remainTime);
    if(time >= remainTime)
    {
      timesUp();
      console.log("hello");
    }
    if(!gameOver && !win)
    {
      let f = setTimeout(() => setTime(time + 1), 1000);
      return () => clearTimeout(f);
    }
    else
    { 
      setSTime(time);
    }
    // console.log(time);
    // console.log(remainTime);
    // if(time === remainTime * 60)
    // {
    //   resign();
    //   console.log("hello");
    // }
  }, [sTime, time, gameOver, win]);

  useEffect(() => {
    if(!gameOver && !win)
    {
      setTime(0);
    }
  }, [gameOver, win]);


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          <span>{gameOver ? Math.floor((remainTime - sTime) / 60) : Math.floor((remainTime - time) / 60)}</span>
          <span>minutes</span>
          <span>{gameOver ? (remainTime - sTime) % 60 : (remainTime - time) % 60}</span>
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
}
