import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {
    state = { 
        actives : {
            "home" : true,
            "about" : false,
            "contact" : false,
            "news" : false,
            "subscribe" : false
        },
    }
    
    handleClick = (curr) => {
        const actives = {
            "home" : false,
            "about" : false,
            "contact" : false,
            "news" : false,
            "subscribe" : false
        }
        actives[curr] = true;
        this.setState({actives})
    }

    render() { 
        return (
            <React.Fragment>
                <nav className="navbar sticky-top navbar-expand-lg bg-light">

                    <div className="container-fluid float-start">
                        <Link style={{ color: 'black' }} className="navbar-brand" to="/">Help U Tarde</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link  style={{ color: 'grey' }} onClick={() => this.handleClick("home")} className={this.state.actives["home"] ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link style={{ color: 'grey' }} onClick={() => this.handleClick("about")} className={this.state.actives["about"] ? "nav-link active" : "nav-link"} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                            <Link style={{ color: 'grey' }} onClick={() => this.handleClick("contact")} className={this.state.actives["contact"] ? "nav-link active" : "nav-link"} to="/contact">contact</Link>
                            </li>
                            <li className="nav-item">
                            <Link style={{ color: 'grey' }} onClick={() => this.handleClick("news")} className={this.state.actives["news"] ? "nav-link active" : "nav-link"} to="/news">news</Link>
                            </li>
                        </ul>
                        </div>
                        </div>

                    <div className='container-fluid float-end'>
                        <div className='float-start'></div>
                        <div className='float-end'>
                            <li className="nav-item navbar-nav float-end">
                            <Link style={{ color: 'grey' }} onClick={() => this.handleClick("subscribe")} className={this.state.actives["subscribe"] ? "nav-link active" : "nav-link"} to="/subscribe">subscribe</Link>
                            </li>
                        </div>
                    </div >
                    </nav>
            </React.Fragment>
        );
    }
}

export default Navbar;