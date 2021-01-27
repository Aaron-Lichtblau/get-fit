import React from 'react';
import './App.css';
import {Card, Container, Row, Col} from 'react-bootstrap';

function About(props){
  console.log('going to About page');
  var aaronPic = require('./pics/Aaron.png');
  var ezraPic = require('./pics/Ezra.png');

  const picStyle = {
    float:'center',
    width:'210px',
    height:'300px',
    margin: 'auto',
    padding: '3px'
  }
  return(
    <div className="App">

    <br></br>

    <Container>
      <Row>
      <h3> About Get Fit </h3>
      <br></br>
      <p> In quarantine, Ezra and Aaron were worried that they were getting smol when they needed to be swol.
      To fix this, they created a Challenging app to motivate themselves and others to workout.
      </p>
      <br></br>
      </Row>
      <Row>
        <Col sm>
          <Card style={{ width: '20rem' }}>

            <Card.Img variant="top" src={aaronPic.default} style={picStyle}/>

            <Card.Body>
              <Card.Title><h2>Aaron Lichtblau</h2></Card.Title>
              <Card.Text>
                <h3 className="bio"> Been getting big since 98 </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      <Col sm>
        <Card style={{ width: '20rem' }}>

          <Card.Img variant="top" src={ezraPic.default} style={picStyle}/>

          <Card.Body>
            <Card.Title><h2>Ezra Zinberg</h2></Card.Title>
            <Card.Text>
              <h3 className="bio"> Small legs </h3>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Container>


    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
  );
}


export {About};
