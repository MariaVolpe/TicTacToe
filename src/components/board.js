import React, { Component }from 'react';
import Square from './square';

class Board extends Component {
    constructor(props) {
        super(props);
        //only 9 turns can be taken before the board is full and the game is tied
        this.maxTurns = 9;
        // intialize squares: blank and not marked
        // turn - false for player 1 (o), true for player 2 (x)
        // turnCount - number of turns taken
        // status - text for board
        // winner - if someone has won the game
        this.state = {
            squares: Array(9).fill({
                value: null,
                marked: false
                }),
            turn: false,
            turnCount: 0,
            status: "Player 1's turn",
            end: false
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
        this.setState((prevState)=>({squares, turn: !prevState.turn, turnCount: ++prevState.turnCount, status,}));   
    }
    renderSquare(i) {
        return <Square
            turn={this.state.turn}
            value={this.state.squares[i].value}
            end={this.props.end}
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
            //create new status to show who moves next
            const status = `Player ${this.turn ? "1" : "2"}'s turn`;
      
            this.setState(() => ({ status, squares, end: false, turnCount: 0 } ));
            
            // call reset to unflag board as to be reset
            this.props.reset.call();
            return;
        }

        // check for a winner or full board
        const winner = calculateWinner(this.state.squares);

        // if there is a new winner and the state has not already been updated to reflect that, update state
        console.log(winner);
        if (winner && !this.state.end){
            const status = ` Player ${(winner==="o" ? "1" : "2")} wins!`;
            this.props.handleWin(winner);
            // loser goes first in next game
            this.setState(() => ({ status, end: true, turn: winner === "o" ? true : false }));
        }
        else if (this.state.turnCount >= this.maxTurns && !this.state.end){
            const status = "Tie!";
            this.props.handleEnd();
            this.setState(() => ({ status, end: true }));
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


export default Board;