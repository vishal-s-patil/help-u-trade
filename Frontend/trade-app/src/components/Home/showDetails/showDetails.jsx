import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './showDetails.css';

class showDetails extends Component {
    render() { 
        return (
            <React.Fragment>
                <div className="container text-center showDetailsContainer">
                    <div className="row">
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                        <div className="col">
                            Column
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to="/">
                            <button type='button' onClick={this.props.handleCancle} className='btn btn-primary'>Go back to Home</button> 
                        </Link>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default showDetails;