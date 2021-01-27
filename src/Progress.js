import React from 'react';
import './App.css';
import { ChallengeModal } from './ChallengeModal';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class ChallengeTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      challengeProgressStates: [{challenge: 'ChallengeName', description: 'ChalDesc', progress: 83}]
    };
  }
  renderChallengeProgress(challengeProgress){
    return(
      <ChallengeProgress
      challenge={challengeProgress['challenge']}
      description={challengeProgress['description']}
      progress={challengeProgress['progress']}>
      </ChallengeProgress>
    );
  }

  render(){
    {/* challengeProgress : {name: ChallengeName, desc: ChalDesc, progress: PercentComplete} */}
    return(
      <ul>
      {this.state.challengeProgressStates.map((item,index) => {
        return <li key={index}>
          {this.renderChallengeProgress(item)}
        </li>})}
      </ul>
    );
  }
}

class ChallengeProgress extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      challenge: props.challenge,
      description: props.description,
      progress: props.progress,
    };
  }

  render(){
  return(
    <div className="challengeProgress">
    <h4>{this.state.name}</h4>
    <p>{this.state.description}</p>
    <CircularProgressbar className="progressBar" value={this.state.progress} text={`${this.state.progress}%`}/>
    <ChallengeModal></ChallengeModal>
    </div>
  );
}
}

function Progress(props){
  return(
    <div className="App">
    <br></br>
    <Container>
      <Row>
        <Col sm="xs-2">
        <h3> Personal Challenges </h3>
        <ChallengeTable></ChallengeTable>
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
