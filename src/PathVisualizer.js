import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import { node } from './node'
import "./PathVisualizer.css"
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra'

const MAX_ROWS = 42; 
const MAX_COLS = 47;
// export var grid = null; 
export var startNode;
export var endNode;

const initGrid = () => {
  let grid = [];
  for (let i=0;i<MAX_ROWS;i++){
    let row = []
    for (let j=0;j<MAX_COLS;j++){
        row.push(new node(i,j)) 
    }
    grid.push(row)
  };
  return grid;
}
function PathVisualizer() {
  const [status, setStatus] = useState("")
  const [isStart, setIsStart] = useState(false)
  const [isAddWall, setIsAddWall] = useState(false)
  const [addWallInprogress, setAddWallInprogress] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [grid, setGrid] = useState([])

  // init grid
  useEffect(() => {
    console.log("Grid inited!!!!")
    setGrid(initGrid())
    console.log("grid:", grid.length)
  }, [grid.length])
  const handleAddStart = (e) => {
    // set the flag
    setIsStart(true);
    setIsEnd(false);
    setIsAddWall(false);
    setStatus("set Start");
  }
  const handleAddEnd = (e) => {
    // set the flag
    setIsEnd(true);
    setIsStart(false);
    setIsAddWall(false);
    setStatus("set End");
  }
  const handleAddWall = (e) => {
    // set the flag
    setIsStart(false);
    setIsEnd(false);
    setIsAddWall(true);
    setStatus("set Wall");
  }
  const handleClear = () => {
    setIsStart(false);
    setIsEnd(false);
    startNode = null;
    endNode = null;
    setIsAddWall(false);
    setAddWallInprogress(false);
    setStatus("");
    setGrid([])
    setTimeout(() => {
      setGrid(initGrid())
    }, 0)
  }
  const handleClick = (row, col) => {
    // set
    let currentNode = grid[row][col];
    if (isStart){
      currentNode.isStart = true;
      startNode = currentNode;
    }
    else {
      currentNode.isEnd = true;
      endNode = currentNode;
    }
    let msg = isStart ? "Start" : isEnd ? "End" : "";
    msg += `(${row},${col})`;
    const res = {isStart,isEnd};
    setIsStart(false);
    setIsEnd(false);
    setStatus(msg);
    return res;
  }
  const handleMouseDown = (row, col) => {
    if (isAddWall){
      setAddWallInprogress(true);
      grid[row][col].isWall = true;
      setGrid([...grid])
    }
  }
  const handleMouseMove= (row, col) => {
    if (isAddWall && addWallInprogress){
      grid[row][col].isWall = true;
      setGrid([...grid])
    }
  }
  const handleMouseUp = (row, col) => {
    if (isAddWall){
      grid[row][col].isWall = true;
      setGrid([...grid])
    }
    setAddWallInprogress(false);
    setIsAddWall(false);
  }
  const visualizeDtra = () => {
    setStatus("Visualizing...");
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        setStatus("Done!!!")
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
  return (
      <div>
          <h3 className="header">Path Visualizer</h3>
          <div className="buttons">
            <div className={ `button ${( startNode || isStart )? "disabled": ""}` } onClick={handleAddStart}>Add Start</div>
            <div className= {`button ${( endNode || isEnd )? "disabled": ""}` }  onClick={handleAddEnd }>Add End</div>
            <div className={`button ${isAddWall ? "disabled": ""}`} onClick={handleAddWall}>Add Wall</div>
            <div className="button" onClick={handleClear}>Clear</div>
            <div className="button" onClick={visualizeDtra}>Find Path</div>
            <div className="statusArea">Status: {status}</div>
          </div> 
          <Grid grid={grid} handleClick={handleClick} handleMouseDown={handleMouseDown} 
              handleMouseUp={handleMouseUp} handleMouseMove={handleMouseMove}/>
      </div>
  )
}

export default PathVisualizer
