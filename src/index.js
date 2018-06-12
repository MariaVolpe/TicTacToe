import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        };
        this.select = this.select.bind(this);
    }

    select(){
        this.props.updateTurn();
        this.setState( () => (this.props.turn ? {value: "x"} : {value: "o"} ));
    }
    render() {
        return (
            <button className="square" onClick={this.select}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: false
        };
        this.updateTurn = this.updateTurn.bind(this);
    }
    updateTurn(){
        this.setState((prevState)=>({turn: !prevState.turn}));
    }
    renderSquare(i) {
        return <Square turn={this.state.turn} updateTurn={this.updateTurn}/>;
    }

    render() {
        const status = `Next player: ${this.state.turn ? "2" : "1"}`;

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
