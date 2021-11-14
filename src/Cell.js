import React, { useState } from 'react'
import "./Cell.css";


function Cell({node, handleClick, handleMouseDown, handleMouseUp, handleMouseMove}) {
  const {row, col, isStart, isFinish, isWall, isVisited, isShortestPath} = node;
  const [startCell, setStartCell] = React.useState(isStart);
  const [endCell, setEndCell] = React.useState(isFinish);
  const cellClicked = () => {
    const {isStart,isEnd} = handleClick(row, col);
    setStartCell(isStart);
    setEndCell(isEnd);
  }
  return (
      <div className={`node ${startCell? "isStart": ""} ${endCell?"isEnd":""} ${isWall?"node-wall":""}`}
           id={`node-${row}-${col}`} 
          onMouseDown={() => handleMouseDown(row, col)}
          onMouseUp={() => handleMouseUp(row, col)}
          onMouseMove={() => handleMouseMove(row, col)}
          onClick={cellClicked}>
      </div>
  )
}

export default Cell

