import React from 'react';
import axios from "axios";
import {Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class ChallengeModal extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.state = {
      challenge : props.challenge,
      file : '',
      caption : '',
      show: false,
      updateState: props.updateState
    };
  }
  handleSubmit(){
    var self = this;
    const data={
      challenge: this.state.challenge,
      file: this.state.file,
      caption: this.state.caption
      }
    {// axios.post('/addWorkout',data).then(res => { // then print response status
    //       console.warn(res);
    //     })
    // self.setState({
    //   show: false
    // });
    }
    axios.get('/progressUpdated', {
      data: {
        challengeName: self.state.challenge
      }}).then(
      (response) => {
          console.log(response.data);
          self.updateState(response.data);
        }
          ,
          (error) => {
              self.setState({error})
            })
    }

  handleClose(){
    var self = this;
    self.setState({
      show: false
    })
  }
  handleShow(){
  var self = this;
  self.setState({
    show: true
  })
}
handleFileChange(event) {
  const target = event.target;
  const value = target.files[0];
  console.log(this.state.challenge)
  console.log(value);

  this.setState({
    file: value,
  });
  event.preventDefault();
}

handleCaptionChange(e) {
   this.setState({caption: e.target.value});
}
    render(){
      return(
    <>
    <Button variant="success" onClick={this.handleShow}>I did this!</Button>
    <Modal
      size="lg"
      show={this.state.show}
      onHide={this.handleClose}
      backdrop="static"
      keyboard={false}
    >
    <Modal.Header closeButton>
      <Modal.Title>Add your {this.state.challenge} Workout</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.File
        id="exampleFormControlFile1"
        label=""
        width ="60"
        accept=".jpeg"
        onChange={this.handleFileChange}/>
      <Form.Group controlId="workoutCaption">
        <Form.Control type="text" placeholder="Tell us about it..." value={this.state.caption} onChange={this.handleCaptionChange}/>
      </Form.Group>
    </Modal.Body>
      <Modal.Footer>
        <Button
        variant="primary"
        onClick={this.handleSubmit}
        >Confirm</Button>
      </Modal.Footer>
    </Modal>
    </>
  )};
}

export {ChallengeModal};
