import React, { Component }from 'react';

class Square extends Component {
    render() {
        //squares not clickable if a player has won game
        return (
            <button className="square" onClick={this.props.winner ? null : this.props.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;