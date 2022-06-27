import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './components/navbar/navbar.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/about/about.jsx';
import Contact from './components/contact/contact.jsx';
import News from './components/news/news.jsx';
import Subscribe from './components/subscribe/subscribe.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowDetails from './components/Home/showDetails/showDetails.jsx';

export default class App extends Component {
    state = {
        data : {},
        spinnerFlag: false
    }
    
    getScrapedData = async(symbol) => {
        const result = await axios.get(`http://localhost:3000/getScrapedData/?cName=${symbol}`)
        
        this.setState({data : result.data});
    }

    setSpinner = () => {
        this.setState({spinnerFlag : true})
    }
    removeSpinner = () => {
        this.setState({spinnerFlag : false})
    }
    
    render() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route 
                exact path='/' 
                element={<Home 
                    getScrapedData={this.getScrapedData}
                    setSpinner={this.setSpinner}
                    ></Home>}>

                </Route>

                <Route path='/about' element={<About></About>}>

                </Route>

                <Route exact path='/contact' element={<Contact></Contact>}>

                </Route>

                <Route exact path='/news' element={<News></News>}>

                </Route>

                <Route exact path='/subscribe' element={<Subscribe></Subscribe>}>

                </Route>
                
                <Route 
                exact path='/showdetails' 
                element={<ShowDetails 
                    data={this.state.data} 
                    spinnerFlag = {this.state.spinnerFlag}
                    removeSpinner={this.removeSpinner}></ShowDetails>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
    }
}
