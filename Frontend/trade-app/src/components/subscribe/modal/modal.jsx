import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

class modal extends Component { 
    render() { 
        const {show} = this.props; 
        const {handleClose} = this.props; 
        return (
            <React.Fragment>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Already subscribed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Not receiving messags?
                </Modal.Body>
                <Modal.Footer>
                    <button style ={ {width : "auto"} } className='btn btn-primary' variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button style ={ {width : "auto"} } className='btn btn-primary' variant="primary">Report a problem</button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
 
export default modal;