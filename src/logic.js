let nextStates = [];
let explored = [];

let exploredWhileRandomizing = [];
let nextStatesWhileRandomizing = [];

class Board {
    #board = [];
    #empty = { x: 0, y: 0 };
    #heuristic = 0;
    #solved = false;
    #previous = null;

    constructor(pieces, previous) {
        let solved = [1, 2, 3, 4, 5, 6, 7, 8, -1];
        let stillSolvable = true;
        for (let i = 0; i < pieces.length / 3; i++) {
            for (let j = 0; j < pieces.length / 3; j++) {
                let current = pieces[i * 3 + j];
                if (stillSolvable) {
                    let currentSolved = solved[i * 3 + j];
                    if (current !== currentSolved) {
                        stillSolvable = false;
                    }
                }
                if (current === -1) {
                    this.empty = { x: j, y: i };
                }
                this.board.push(current);
            }
        }
        this.solved = stillSolvable;
        this.heuristic = this.calculateHeuristic();
        this.previous = previous;
    }

    nextStates(nextStates) {
        let x = this.empty.x;
        let y = this.empty.y;
        let size = this.board.length / 3;
        let newBoard;


        switch (x) {
            case 0:
                switch(y) {
                    case 0:
                        newBoard = this.swap(x, y, x + 1, y)
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    case (size-1):
                        newBoard = this.swap(x, y, x + 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    default:
                        newBoard = this.swap(x, y, x + 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                }
                break;
            case (size-1):
                switch(y) {
                    case 0:
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    case (size-1):
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    default:
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                }
                break;
            default:
                switch(y) {
                    case 0:
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x + 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    case (size-1):
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x + 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                    default:
                        newBoard = this.swap(x, y, x - 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x + 1, y);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y - 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        newBoard = this.swap(x, y, x, y + 1);
                        if (!isExplored(newBoard)) { nextStates.push(newBoard); }
                        break;
                }
                break;
        }
    }

    swap(x1, y1, x2, y2) {
        let pos1 = y1 * 3 + x1;
        let pos2 = y2 * 3 + x2;
        let newBoard = [...this.board];
        let temp = newBoard[pos1];
        newBoard[pos1] = newBoard[pos2];
        newBoard[pos2] = temp;
        return new Board(newBoard, this);
    }

    calculateHeuristic() {
        let heuristic = 0;
        for (let y = 0; y < this.board.length / 3; y++) {
            for (let x = 0; x < this.board.length / 3; x++) {
                let number = this.board[y * 3 + x];
                if (number !== -1) {
                    let posX = (number - 1) % 3;
                    let posY = Math.floor((number - 1)/ 3);
                    heuristic += Math.abs(posX - x) + Math.abs(posY - y);
                }
            }
        }
        return heuristic;
    }

    get board() {
        return this.#board;
    }

    set board(pieces) {
        this.#board = pieces;
    }

    get heuristic() {
        return this.#heuristic;
    }

    set heuristic(heuristic) {
        this.#heuristic = heuristic;
    }

}

let isExplored = (board) => {
    // console.log("board: ", board.board);
    for (let i = 0; i < explored.length; i++) {
        // console.log("explored: ", explored[i].board);
        if (areArrayEqual(explored[i].board, board.board)) {
            // console.log("true");
            return true;
        }
    }
    return false;
}

let areArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((element, index) => element === arr2[index]);
}

let randomize = (board) => {
    nextStatesWhileRandomizing = [];  
    exploredWhileRandomizing = [];

    board = new Board(board, null);

    board.nextStates(nextStatesWhileRandomizing);
    for (let i = 0; i < 10 || board.heuristic < 20; i++) {
        if (i > 5) return board.board;
        nextStatesWhileRandomizing.sort((a, b) => b.heuristic - a.heuristic);
        board = nextStatesWhileRandomizing.shift();
        board.nextStates(nextStatesWhileRandomizing);
        console.log("board heuritic: ", board.heuristic);
    }

    
    return board.board;
}




function solve(pieces) {
    let board = new Board(pieces, null);

    explored = [];
    nextStates = [];

    while (board.heuristic !== 0) {
        board.nextStates(nextStates);
        nextStates.sort((a, b) => a.heuristic - b.heuristic);

        board = nextStates.shift();
        explored.push(board);

    }

    return getTheRoute(board);
}


let getTheRoute = (board) => {
    let route = [];
    while (board.previous !== null) {
        route.push(board.board);
        board = board.previous;
    }
    route.push(board.board);
    return route.reverse();
}


export { solve, randomize };
