import React from 'react'
import "./Grid.css";
import Cell from './Cell';

function Grid({grid, handleClick, handleMouseDown, handleMouseUp, handleMouseMove}) {
    console.log("grid passed in:", grid?.length); 
    return (
        <div className="grid">
          {grid? grid.map((row, rowId) =>{
            return (
              <div className="row" key={rowId}>
                {row.map((node, nodeId)=> {
                  return (
                    <Cell key={nodeId} node = {node} handleClick={handleClick}
                    handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} 
                    handleMouseMove={handleMouseMove}
                    >   
                    </Cell> 
                  )
                })}
              </div>
            )
          }): null}
        </div>
    )
}

export default Grid
