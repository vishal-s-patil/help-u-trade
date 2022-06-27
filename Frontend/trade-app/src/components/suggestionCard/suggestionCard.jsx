import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './suggestionCard.css';

class suggestionCard extends Component {
    state = {  } 
    render() { 
        const {id, symbol, instrument_name, exchange} = this.props.suggestion;
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <Link onClick={() => this.props.handleClick(id)} to="/showdetails">
                            {symbol}, {instrument_name}, {exchange}
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default suggestionCard;