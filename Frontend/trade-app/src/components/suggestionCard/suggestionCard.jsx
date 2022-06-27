import React, { Component } from 'react'
import './suggestionCard.css';

class suggestionCard extends Component {
    state = {  } 
    render() { 
        const {id, symbol, instrument_name, exchange} = this.props.suggestion;
        return (
            <React.Fragment>
                <div className="card">
                    <div onClick={() => this.props.handleClick(id)} className="card-body">
                        {symbol}, {instrument_name}, {exchange}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default suggestionCard;