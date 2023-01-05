import React, { useState } from 'react';
import Game from '../components/Game';
import './css/JoinGame.css';
// import './css/Board.css';
// import './css/HomePage.css';

const initArray = Array(9).fill(Array(9).fill(0));

let num = 0;
let client;

const JoinGame = ({currentUser, stageOnChange}) => {

    if(num === 0)
    {
      client = new WebSocket('ws://localhost:4000');
      client.onopen = () => console.log('Backend socket server connected!');
      num++;
    }

    const [startBattle, setStartBattle] = useState(false);
    const [rival, setRival] = useState("");
    const [invite, setInvite] = useState(false);
    const [array, setArray] = useState(initArray);
    const [msg, setMsg] = useState("");

    console.log(invite, startBattle);

    const start = () => {
        setStartBattle(true);
        if(currentUser.localeCompare(rival) === 1)
        {
            setMsg("You are black!");
        }
        else
        {
            setMsg("You are white!");
        }
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        console.log(data);
        // console.log('byteString: '+byteString.buffer);
        const [type, payload] = JSON.parse(byteString.data);
        console.log(type, payload);
        switch (type) {
            case "CREATE": {
                let game = payload;
                let player = game.player;
                let name = game.name;
                console.log(player);
                if(player % 2 === 0 && player !== 0 && (name === currentUser + "_" + rival || name === rival + "_" + currentUser)) start(); //bug
                console.log(invite, startBattle);
                break;
            }
            case "CHANGE": {
                let game = payload;
                let arr = game.status;
                let name = game.name;
                if(name === currentUser + "_" + rival || name === rival + "_" + currentUser) setArray(arr);
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    function generateName(a, b) {
        let name;
        if(a.localeCompare(b) === 1) name = a + "_" + b;
        else name = b + "_" + a;
        return name;
    }

    const StartGameOnClick = async () => {
        setInvite(true);
        let name = generateName(currentUser, rival);
        console.log(name);
        sendData({
            type: "CREATE",
            payload: {name},
        })
    }

    const makeDecision = async (color, row, col) => {
        let name = generateName(currentUser, rival);
        sendData({
            type: "CHANGE",
            payload: {name, color, row, col},
        })
    }

    const handleClickOK = () => {
        // fetchProfile();
        console.log(invite, startBattle);
        stageOnChange(0);
    }

  return (
    <div className="joinGameContainer">
        {/* <p className='title' style={{display: !startBattle && !invite? 'block' : 'hide' }}>Battle</p>*/}
        {/* <p style={{visibility: !startBattle && invite? 'visible' : 'hidden' }}> Waiting for the other player to join...</p>  */}
        <Game startBattle={startBattle} array={array} makeDecision={makeDecision} currentUser={currentUser} rival={rival} stageOnChange={stageOnChange}></Game>
        <div className="joinGame" style={{visibility: !startBattle && !invite? 'visible' : 'hidden' }}>
          <input type="text"
            placeholder="Username of rival..."
            onChange={(event) => {
              setRival(event.target.value);
            }}
          />
          <button onClick={StartGameOnClick}> Join / Start Game</button>
          <button onClick={handleClickOK}> Back To Home</button>
        </div>
        <p className="text2" style={{visibility: startBattle? 'visible' : 'hidden' }}> {msg}</p>
        <p className="text" style={{visibility: !startBattle && invite? 'visible' : 'hidden' }}> Waiting for the other player to join...</p>
      {/* {startBattle ? (
        <Game></Game>
      ) : (
        invite ? (
            <p> Waiting for the other player to join...</p>
        ) :
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRival(event.target.value);
            }}
          />
          <button onClick={StartGameOnClick}> Join/Start Game</button>
        </div>
      )}
      <button onClick={handleClickOK}>Back</button> */}
    </div>
  )
}

export default JoinGame