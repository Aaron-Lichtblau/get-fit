import React from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class ChallengeBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      challenges: ['hi'],
      startDates: ['there'],
      durations: ['25'],
      activeChallenges: ['false']
    }
  }

  renderChallengeBox(challengeBox){
    return(
      <ChallengeBox
      challenge={challengeBox['challenge']}
      startDate={challengeBox['startDate']}
      duration={challengeBox['duration']}
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
      const challengeBox = {challenge: challenge, startDate: startDate, duration: duration, active: active};
      content.push(<li>{this.renderChallengeBox(challengeBox)}</li>);
    }
    return content;
  }

  render(){
    return <ul>{this.getChallengeBoxesContent(this.state.challenges)}</ul>;
  }
}

// sign up button

function ChallengeBox(props){
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
        <SignUpButton challenge={props.challenge} active= {props.active}></SignUpButton>
        </Col>
    </Container>
    <br></br>
    </div>
  );
}
export {ChallengeBoard};
