import React, { Component }from 'react';
import Board from './board';

class Game extends Component {
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
        this.setState(()=>({winner: false, reset: {value: false, call: this.setResetFalse}}));
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

export default Game;