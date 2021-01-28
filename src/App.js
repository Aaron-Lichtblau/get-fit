import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container, Row, Col} from 'react-bootstrap';


function App() {
  return (
    <div className="app">
    <Container>
      <Row>
        <Col></Col>
        <Col>
        <div className="welcomeText">
        <h2>Motivate</h2>
        <p>Join Princeton students in exercise challenges to stay healthy while socially distancing</p>
        </div>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <br></br>
        <Col></Col>
        <Col>
        <div className="imageCarousel">
        <ControlledCarousel></ControlledCarousel>
        </div>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
        <h3>Challenge Board</h3>
        </Col>
        <Col>
        <h3>Leader Board</h3>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  var aaronPic = require('./pics/Aaron.png');
  var ezraPic = require('./pics/Ezra.png');

  const picStyle = {
    float:'center',
    height:'300px',
    margin: 'auto',
    padding: '10px'
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <div>
        <img
          className="d-block w-100"
          src={aaronPic.default}
          style={picStyle}
          alt="First slide"
        />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img
          className="d-block w-100"
          src={ezraPic.default}
          style={picStyle}
          alt="Second slide"
        />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default App;
