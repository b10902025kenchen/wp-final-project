import React, { useState, useEffect } from 'react';
import axios from '../api';
import './css/profile.css';
import { SmileTwoTone, FrownTwoTone, MehTwoTone, UserOutlined, StarOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';

const Profile = ({stageOnChange, currentUser}) => {

    console.log(currentUser);
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

    const handleClickOK = () => {
        // fetchProfile();
        stageOnChange(0);
    }

  return (
    <div className="profileContainer">
        <p className='title'>Profile</p>
        <div className="profileWrapper">
            {/* <div>Hello</div> */}
            <div className="profile-card">
                <div className="card-header">
                    {/* <div>hello</div> */}
                    <div className="name"><UserOutlined></UserOutlined> User: {currentUser}</div>
                    <div className="games"><BarChartOutlined style={{color: "blue"}}></BarChartOutlined> Games: {W + T + L}</div>
                    <div className="games"><DollarOutlined ></DollarOutlined> Coins: {coins}</div>
                    <div className="level"><StarOutlined style={{color: "blue"}}></StarOutlined> Level: {Math.floor((coins) / 100) + 1}</div>
                    <div className="container">
                        <div className="skills coins" style={{width: str}}></div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="numbers">
                        <div className="item">
                            <SmileTwoTone></SmileTwoTone>Win
                            <span>{W}</span>
                        </div>
                        <div className="item">
                            <MehTwoTone></MehTwoTone>Tie
                            <span>{T}</span>
                        </div>
                        <div className="item">
                            <FrownTwoTone></FrownTwoTone>Loss
                            <span>{L}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className='btn' onClick={handleClickOK}>OK</button>
    </div>
  )
}

export default Profile