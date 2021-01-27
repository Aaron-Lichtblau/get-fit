import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';

function Progress(props){

  return(
    <div className="App">
    <br></br>
    <Container>
      <Row>
        <Col>
        <h3> Personal Challenges </h3>
        </Col>
        <Col>
        <h3> Completed Workouts </h3>
        </Col>
      </Row>
      <Row>
      </Row>
    </Container>


    <br></br>
    </div>
  );
}


export {Progress};
