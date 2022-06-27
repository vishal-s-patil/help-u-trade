import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './showDetails.css';
import Spinner from '../../spinner/spinner';

class showDetails extends Component {
    
    componentWillReceiveProps() {
        this.props.removeSpinner();
    }

    render() { 
        var {BookValue} =  this.props.data;
        var {CurrentPrice} = this.props.data;
        var {DividendYield} = this.props.data;
        var {FaceValue} = this.props.data;
        var {High} = this.props.data;
        var {Low} = this.props.data;
        var {MarketCap} = this.props.data;
        var {ROC} = this.props.data;
        var {ROE} = this.props.data;
        var {Stock_PE} = this.props.data;
        return (
            <React.Fragment>
                {this.props.spinnerFlag?<Spinner />:""}
                <div className="container text-center showDetailsContainer">
                    <div className="row">
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    BookValue
                                </div>
                                <div>
                                    {BookValue}
                                </div>
                            </div>
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    CurrentPrice
                                </div>
                                <div>
                                    {CurrentPrice}
                                </div>
                            </div>
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    DividendYield
                                </div>
                                <div>
                                    {DividendYield}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    FaceValue
                                </div>
                                <div>
                                    {FaceValue}
                                </div>
                            </div> 
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    High
                                </div>
                                <div>
                                    {High}
                                </div>
                            </div>
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Low
                                </div>
                                <div>
                                    {Low}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    ROC
                                </div>
                                <div>
                                    {ROC}
                                </div>
                            </div>
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    ROE
                                </div>
                                <div>
                                    {ROE}
                                </div>
                            </div>
                        </div>
                        <div className="col border border-5">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Stock_PE
                                </div>
                                <div>
                                    {Stock_PE}
                                </div>
                            </div>
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