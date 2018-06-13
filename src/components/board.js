import React, { Component }from 'react';
import Square from './square';

class Board extends Component {
    constructor(props) {
        super(props);

        // intialize squares: blank and not marked
        // turn - false for player 1 (o), true for player 2 (x)
        // status - text for board
        // winner - if someone has won the game
        this.state = {
            squares: Array(9).fill({
                value: null,
                marked: false
                }),
            turn: false,
            status: "Player 1's turn",
            winner: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.renderSquare = this.renderSquare.bind(this);
    }
    // mark square on click
    handleClick(i){
        // do nothing if square already marked
        if (this.state.squares[i].marked){
            return;
        }
        //create new array of squares with one marked x or o
        const squares = this.state.squares.slice();
        squares[i] = (this.state.turn ? {value: "x", marked: true} : {value: "o", marked: true} );
        //create new status to show who moves next
        const status = `Player ${this.state.turn ? "1" : "2"}'s turn`;
        //update state
        this.setState((prevState)=>({squares, turn: !prevState.turn, status}));   
    }
    renderSquare(i) {
        return <Square
            turn={this.state.turn}
            value={this.state.squares[i].value}
            winner={this.props.winner}
            handleClick={ () => this.handleClick(i) }/>;
    }
    // when board updates check for a winner or flag to reset board
    componentDidUpdate(){
        // if board is to be reset (user clicks on play again)
        if (this.props.reset.value){

            // create new array of empty squares and update state
            const squares = Array(9).fill({
                    value: null,
                    marked: false
                    });
            const turn = turn;
            //create new status to show who moves next
            const status = `Player ${this.turn ? "1" : "2"}'s turn`;
      
            this.setState(() => ({ status, squares, winner: false } ));
            
            // call reset to unflag board as to be reset
            this.props.reset.call();
            return;
        }

        // check for a winner
        const winner = calculateWinner(this.state.squares);

        // if there is a new winner and the state has not already been updated to reflect that, update state
        if (winner && !this.state.winner){
            const status = ` Player ${(winner==="o" ? "1" : "2")} wins!`;
            this.props.handleWin(winner);
            // loser goes first in next game
            this.setState(() => ({ status, winner: true, turn: winner === "o" ? true : false }));
            
        }
    }
    // render board with 9 squares
    render() {
        return (
            <div>
                <div className="status">{this.state.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// calculate if there is a winner
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
          return squares[a].value;
        }
      }
      return null;
}

// calculate if board is full and there is no winner
function checkLose(squares){
    squares.forEach( (square) => {
        if (!square.marked){
            return false;
        }
    });
    return true;
}

export default Board;