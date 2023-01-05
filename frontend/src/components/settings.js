import React, { useState } from 'react';
import './css/settings.css';
import { AimOutlined, TableOutlined, ClockCircleOutlined } from '@ant-design/icons';

const Settings = ({stageOnChange, boardSizeOnChange, timeOnChange, turnOnChange}) => {

    const [board_size, setboard_size] = useState(13);
    const [tempTime, setTempTime] = useState(10);
    const [tempTurn, setTempTurn] = useState(1);

    const handleFirst = (e) => {
        let val = document.querySelector('input[name="go first"]:checked').value;
        //console.log(val);
        setTempTurn(Number(val));
    }
    
    const handleSize = (e) => {
        setboard_size(e.target.value);
    }
    
    const handleTime = (e) => {
        setTempTime(e.target.value);
    }

    const handleClickOK = () => {
        console.log(board_size, tempTime, tempTurn);
        boardSizeOnChange(board_size);
        timeOnChange(tempTime);
        turnOnChange(tempTurn);
        stageOnChange(0);
    }

    return (
        <div className="settingsWrapper">
            <p className='title'> Settings </p>
            <form className='form-style-6'>
                <div>
                    <p className="controlTitle"><AimOutlined></AimOutlined> Go first</p>
                    <div>
                        <input type="radio" id="black" name="go first" value="1" onChange={handleFirst}></input>
                        <label for="black" className='label-text'>Let me go first!</label>
                    </div>
                    <div>
                        <input type="radio" id="white" name="go first" value="2" onChange={handleFirst}></input>
                        <label for="white" className='label-text'>Let AI go first!</label>
                    </div>
                </div>
                <div style={{'visibility': 'hidden'}}>==</div>
                <div>
                    <p className="controlTitle"><TableOutlined></TableOutlined> Board Size</p>
                    <input type='range' step='2' min="9" max="15" defaultValue="13" onChange={handleSize}></input>
                    <p className="controlNum">{board_size}</p>
                </div>
                <div style={{'visibility': 'hidden'}}>==</div>
                <div>
                    <p className="controlTitle"><ClockCircleOutlined></ClockCircleOutlined> Time limit (min)</p>
                    <input type='range' step='1' min="1" max="20" defaultValue="10" onChange={handleTime}></input> 
                    <p className="controlNum">{tempTime}</p>
                </div>
            </form>
            <button className='btn' onClick={handleClickOK}>Save</button>
        </div>
    )

    // return (
    //     <div>
    //         <p className='title'> Settings </p>
    //             <div className="controlContainer">
    //                 <div className="controlWrapper">
    //                 <div className="controlPanel">
    //                     <div className="controlCol">
    //                         <p className="controlTitle">Go first</p>
    //                         {/* <input type='range' step='1' min="1" max="50" defaultValue="10" onChange={handleFirst}></input> */}
    //                         <form>
    //                             <input type="radio" id="black" name="go first" value="1" onChange={handleFirst}></input>
    //                             <label for="black">Black(Go first)</label>
    //                             <input type="radio" id="white" name="go first" value="2" onChange={handleFirst}></input>
    //                             <label for="white">White(Go second)</label>
    //                         </form>
    //                     </div>
    //                     <div className="controlCol">
    //                         <p className="controlTitle">Board Size (n*n)</p>
    //                         <input type='range' step='2' min="9" max="19" defaultValue="13" onChange={handleSize}></input>
    //                         {/* <form>
    //                             <input type="radio" id="9" name="board size" value="9"></input>
    //                             <label for="9">9 x 9</label>
    //                             <input type="radio" id="13" name="board size" value="13"></input>
    //                             <label for="13">13 x 13</label>
    //                             <input type="radio" id="19" name="board size" value="19"></input>
    //                             <label for="19">19 x 19</label>
    //                         </form> */}
    //                         <p className="controlNum">{board_size}</p>
    //                     </div>
    //                     <div className="controlCol">
    //                         <p className="controlTitle">Time limit(min)</p>
    //                         <input type='range' step='1' min="1" max="20" defaultValue="10" onChange={handleTime}></input> 
    //                         <p className="controlNum">{tempTime}</p>
    //                     </div>
    //                 </div>
    //                 </div>
    //             </div>
    //         <button className='btn' onClick={handleClickOK}>OK</button>
    //     </div>
    // )
}

export default Settings