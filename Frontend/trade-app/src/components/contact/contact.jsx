import React, { Component } from 'react';
import axios from 'axios';
import './contact.css';

class Contact extends Component {
    handleSubmit = async (e) => {
        e.preventDefault();

        const contactData = {
            name : e.target.name.value,
            phoneNum : e.target.phnum.value,
            email : e.target.email.value,
            message : e.target.message.value
        }

        await axios.post("http://localhost:3000/contactData", contactData);

        alert('submitted');
        e.target.name.value = "";
        e.target.phnum.value = "";
        e.target.email.value = "";
        e.target.message.value = "";
    }

    render() { 
        return (
            <React.Fragment>
                <div className="container container-contact">
                    <h1 className='text-center'>Help us improve our site</h1>
                    <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="textHelp" />
                        <div id="textHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contact number</label>
                        <input type="number" name="phnum" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div>
                        <label htmlFor="message">write your comment here : </label>
                    </div>
                    <div className="mb-3">
                        <textarea rows="10" cols="60" name="message" id="message">
                            </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Contact;