import React from 'react';
import './App.css';
import { ChallengeModal } from './ChallengeModal';
import {Container, Row, Col} from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class ChallengeTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      challengeProgressStates: [{challenge: 'Push Ups', description: 'do 100 pushups in 24 hours', progress: 0},
      {challenge: '5k run', description: 'run 5 kilometers in 24 hours', progress: 25},
      {challenge: 'Squats', description: 'do 80 squats in 24 hours', progress: 45},
      {challenge: 'Yoga', description: 'do 45 minutes of yoga in 24 hours', progress: 83},
      {challenge: 'Sprints', description: 'sprint 40 meters 10 times in 24 hours', progress: 55}]
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
    this.updateState = this.updateState.bind(this);
    this.state = {
      challenge: props.challenge,
      description: props.description,
      progress: props.progress,
    };
  }
  updateState(data){
    this.setState({
      progress: data['progress'],
    })
  }

  render(){
  return(
    <div className="challengeProgress">
    <h4>{this.state.challenge}</h4>
    <p>{this.state.description}</p>
    <CircularProgressbar className="progressBar" value={this.state.progress} text={`${this.state.progress}%`}/>
    <ChallengeModal challenge= {this.state.challenge} updateState={(data) => this.updateState(data)}></ChallengeModal>
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
