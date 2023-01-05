import "./css/Cell.css"
import React from "react";

export default function Cell({ rowIdx, colIdx, detail, revealCell, turn, flag }) {
    const cellStyle = {
        // color: numColorCode(detail.value),
        border: detail.value!==0 ? "2px inset black" : "2px outset black",
    }
    //console.log(detail.value);
    const ID = rowIdx.toString() + '-' + colIdx.toString();
    let s = color(detail.value);

    // console.log(detail.value);

    return (
        <div
            id={ID}
            className='cell'
            style={cellStyle}
            onClick={() => revealCell(detail.x, detail.y)}
        >
            <div className = {detail.value === 0 ? "stone empty" : (detail.value + turn) % 2 === 0 ? "stone black" : "stone white"}>
                <div className="dot" style={{visibility: flag ? 'visible' : 'hidden' }}></div>
            </div>
        </div>

    );
}

const color = (num) => {
    // console.log(num);
    if(num == 0) return "stone empty";
    if(num == 1) return "stone black";
    if(num == 2) return "stone white";
}