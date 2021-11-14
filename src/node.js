export class node {
    row;
    col;
    val;
    isStart;
    isFinish;
    isWall;
    isVisited;
    previousNode;
    distance;

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.val = row+';'+col;
        this.isStart = false;
        this.isFinish = false;
        this.isWall = false;
        this.isVisited = false;
        this.previousNode = null;
        this.distance = Infinity;
    }
}