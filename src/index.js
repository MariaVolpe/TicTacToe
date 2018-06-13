import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.winner ? null : this.props.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        // intialize squares: blank and not marked
        // turn - false for player 1, true for player 2
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
        //create new array of squares with one marked x or o and status and update state
        const squares = this.state.squares.slice();
        const status = `Player ${this.turn ? "2" : "1"}'s turn`
        squares[i] = (this.state.turn ? {value: "x", marked: true} : {value: "o", marked: true} );

        this.setState((prevState)=>({squares, turn: !prevState.turn, status}));   
    }
    renderSquare(i) {
        return <Square turn={this.state.turn} value={this.state.squares[i].value} winner={this.props.winner} handleClick={ () => this.handleClick(i) }/>;
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
            this.setState(() => ({ squares } ));
            
            // call reset to unflag board as to be reset
            this.props.reset.call();
        }

        // check for a winner
        const winner = calculateWinner(this.state.squares);
        // if there is a new winner and the state has not already been updated to reflect that, update state
        if (winner && !this.state.winner){
            const status = ` Player ${(winner==="o" ? "1" : "2")} wins!`;
            this.props.handleWin(winner);
            this.setState(() => ({ status, winner: true} ));
            
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

class Game extends React.Component {
    constructor(props){
        super(props);
        // player scores
        // if a winner has been found
        // if board needs to be reset and function to unflag board as needing to be reset
        this.state = {
            playerScore: Array(2).fill(0),
            winner: false,
            reset: {
                value: false,
                call: this.setResetFalse
            }
        };
        this.handleWin = this.handleWin.bind(this);
        this.setResetFalse = this.setResetFalse.bind(this);
    }
    // update score when winner is found
    handleWin(winner){
        const playerScore = this.state.playerScore.slice();
        playerScore[(winner==="o" ? 0 : 1)]++;
        this.setState(()=>({winner: true, playerScore}));
    }

    // unflag board as needing to be reset
    setResetFalse(){
        this.setState(()=>({reset: {value: false, call: this.setResetFalse}}));
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board handleWin={this.handleWin} winner={this.state.winner} reset={ this.state.reset } />
                </div>
                <div className="game-info">
                    <div>Player 1 Score</div>
                    <ol>{this.state.playerScore[0]}</ol>
                    <div>Player 2 Score</div>
                    <ol>{this.state.playerScore[1]}</ol>
                    {this.state.winner ? <button onClick={() => {
                        this.setState(()=>({reset: {value: true, call: this.setResetFalse} }));
                            }
                        }>Play Again</button> : <div />}
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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
