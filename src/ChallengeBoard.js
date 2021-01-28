import React from 'react';
import axios from "axios";
import {Button, Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class ChallengeBoard extends React.Component {
  constructor(props){
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      challenges: ['push up', 'sprint'],
      startDates: ['5/5', '5/12'],
      durations: ['25', '10'],
      activeChallenges: [false, true],
      participantCount: ['3', '7']
    }
  }
  handleSignUp(){
    console.log('signed up');
  }

  renderChallengeBox(challengeBox){
    var self = this;
    return(
      <ChallengeBox
      challenge={challengeBox['challenge']}
      startDate={challengeBox['startDate']}
      duration={challengeBox['duration']}
      participantCount={challengeBox['participantCount']}
      handleSignUp={self.handleSignUp()}
      active={challengeBox['active']}>
      </ChallengeBox>
    );
  }
  getChallengeBoxesContent(challenges) {
    let content = [];
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const startDate = this.state.startDates[i];
      const duration = this.state.durations[i];
      const active = this.state.activeChallenges[i];
      const participantCount = this.state.participantCount[i];
      const challengeBox = {challenge: challenge, startDate: startDate, duration: duration, participantCount: participantCount, active: active};
      content.push(<li>{this.renderChallengeBox(challengeBox)}</li>);
    }
    return content;
  }

  render(){
    return <ul>{this.getChallengeBoxesContent(this.state.challenges)}</ul>;
  }
}

function SignUpButton(props){
  const participationStatus = (props.active) ? 'Start!' : 'Joined';
  console.log(props.handleSignUp);
  return (
    <Button variant="primary" onClick={props.handleSignUp}>{participationStatus}</Button>
  );
}

function ChallengeBox(props){
  console.log(props.handleSignUp);
  return(
    <div className="ChallengeBox">
    <br></br>
    <Container>
        <Col>
        <h4>  {props.challenge}</h4>
        </Col>
        <Col>
        <h4> {props.startDate} </h4>
        </Col>
        <Col>
        <h4> {props.duration} </h4>
        </Col>
        <Col>
        <h4> {props.participantCount} </h4>
        </Col>
        <Col>
        <SignUpButton active={props.active} handleSignUp={props.handleSignUp}></SignUpButton>
        </Col>
    </Container>
    <br></br>
    </div>
  );
}
export {ChallengeBoard};
