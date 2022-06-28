import React, { Component } from 'react'
import './subscribe.css'
import axios from 'axios'
import Modal from './modal/modal'

class Subscribe extends Component {

    state = {
        modalFlag : false
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const subscriberData = {
            email : e.target.email.value,
            show : false
        }

        const res = await axios.post("http://localhost:3000/subscribe", subscriberData);
        
        if(res.data.success) {
            alert('subscribed !\nNow its on us to keep u updated');
        }
        else {
            this.setState({modalFlag : true})
            e.target.modalBtn.click();
        }

        e.target.email.value = "";
    }

    handleClose = () => {
        this.setState({show : false})
    }

    handleShow = () => {
        this.setState({show : true})
    }

    render() { 
        return (
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>
                            Subscribe to get daily updates
                        </h1>
                        <p style={{marginTop : "10px"}}>
                            When it comes to investing and stock trading, news and reaction time can make or break an investor. This is the best site for up-to-date financial news.
                        </p>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                            <input type="text" name="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                        <button type='submit' name='btn' className='btn btn-primary'>Subscribe</button>
                        <button name='modalBtn' style={{position : "absolute", top:'-600px'}} onClick={this.handleShow}>
                            
                        </button>
                        <Modal show={this.state.show} handleClose={this.handleClose}>
                        </Modal>

                    </form>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default Subscribe;