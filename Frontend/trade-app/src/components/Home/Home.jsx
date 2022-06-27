import React, { Component } from 'react';
import './Home.css';
import SuggestionCard from '../suggestionCard/suggestionCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    state = {
        suggestions : [],
        searchInp: ""
    }

    getCompanySymbol = async(cName) => {
        const res = await axios.get(`http://localhost:3000/getCompanyName?keyword=${cName}`);
        let i = 0;
        const data = res.data.map(ele => {
            ele.id = i
            i++;
            return ele;
        })
        return data;
    }

    handleSubmit = () => {
        this.props.setSpinner();
        
        const cName = this.state.searchInp;
        
        this.getCompanySymbol(cName)
        .then(cSymbols => {
            this.props.getScrapedData(cSymbols[0].symbol)
        });
    }

    handleSearchBoxChange = async (e) => {
        e.persist();
        this.setState({searchInp : e.target.value})

        const cName = e.target.value;
        
        const data = await this.getCompanySymbol(cName);

        await this.setState({suggestions : data})
    }

    handleSuggestionClick = async(id) => {
        this.props.setSpinner();
        const suggestion = await this.state.suggestions[id];
        
        const cName = suggestion.symbol;

        const cSymbol = await this.getCompanySymbol(cName);

        await this.props.getScrapedData(cSymbol[0].symbol);
    }

    render() {
    return (
        <React.Fragment>
        <div className="container">
            <form className='large-font'>
                <label htmlFor="searchInp" className="form-label">Search stocks</label>
                <input type="text" id="searchInp" name="searchBox" className="form-control" onChange={this.handleSearchBoxChange}/>
                <Link to="/showdetails">
                    <button type="submit" onClick={this.handleSubmit} name="searchBtn" className="btn btn-secondary">Search</button>
                </Link>
                <div className="form-text" >
                    Search your fav stock and keep an eye on it
                </div>
            </form>

            <div className='sugg'>
                {this.state.suggestions.map(suggestion => 
                    <SuggestionCard
                        key={suggestion.id}
                        handleClick={this.handleSuggestionClick}
                        suggestion = {suggestion}
                    >
                    </SuggestionCard>
                )}
            </div>
        </div>
        </React.Fragment>
    )
    }
}