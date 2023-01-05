import React, { useState, useEffect } from 'react';
import './css/Intro.css';
import axios from '../api';
import { UserOutlined, StarFilled, DollarOutlined, PercentageOutlined } from '@ant-design/icons';

const Intro = ({currentUser}) => {

    const [W, setW] = useState(0);
    const [T, setT] = useState(0);
    const [L, setL] = useState(0);
    const [coins, setCoins] = useState(0);
    const [str, setStr] = useState('0%');

    const fetchProfile = async () => {
        console.log(currentUser);
        const {
          data: { user },
        } = await axios.get('/fetch', {
          params:{
            name: currentUser,
          }
        });
        console.log(user);
        setW(Math.round(user.win));
        setT(Math.round(user.tie));
        setL(Math.round(user.loss));
        setCoins(user.coin);
        // console.log(user.coin);
        let temp = (user.coin % 100).toString() + '%';
        setStr(temp);
        // console.log(temp);
      }

      useEffect(() => {
        fetchProfile();
    }, [currentUser])

  return (
    <div>
        <div className="container">
            <div className="header">
                <div><UserOutlined></UserOutlined> User: {currentUser}</div>
                <div style={{"color":"blue"}}><StarFilled></StarFilled> Level: {(Math.floor((coins) / 100) + 1)} </div>
                <div style={{"color":"gold"}}><DollarOutlined></DollarOutlined> Coins: {coins} </div>
                <div><PercentageOutlined></PercentageOutlined> WP: {W+T+L === 0? 0: Math.round(W / (W + T + L) * 1000) / 1000}</div>
            </div>
        </div>
    </div>
  )
}

export default Intro