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
      challenges: [],
      activeChallenges: [false, false, false, false, false],
    }
  }
  componentDidMount(){
    var self = this;
    axios.get('/challengeboard').then(
      (response) => {
          console.log(response.data);
          self.setState({
            challenges: response.data
          }
          )
        }
          ,
          (error) => {
              self.setState({error})
            })
  }
  handleSignUp(){
    console.log('signed up');
  }

  renderChallengeBox(challengeBox){
    var self = this;
    return(
      <ChallengeBox
      challenge={challengeBox['challenge']}
      description={challengeBox['description']}
      startDate={challengeBox['startDate']}
      length={challengeBox['length']}
      userCount={challengeBox['userCount']}
      handleSignUp={self.handleSignUp()}
      active={challengeBox['active']}>
      </ChallengeBox>
    );
  }
  getChallengeBoxesContent(challenges) {
    var self = this;
    let content = [];
    for (let i = 0; i < challenges.length; i++) {
      const challengeObject = challenges[i];
      const challenge = challengeObject.challengeName;
      const startDate = challengeObject.startDate;
      const len = challengeObject.len;
      const userCount = challengeObject.userCount;
      const active = self.state.activeChallenges[i];
      const challengeBox = {challenge: challenge, startDate: startDate, length: len, userCount: userCount, active: active};
      content.push(<li>{this.renderChallengeBox(challengeBox)}</li>);
    }
    return content;
  }

  render(){
    return <ul>{this.getChallengeBoxesContent(this.state.challenges)}</ul>;
  }
}

function SignUpButton(props){
  const participationStatus = (props.active) ? 'Joined' : 'Start!';
  const color = (props.active) ? 'success': 'primary';
  console.log(props.handleSignUp);
  return (
    <Button variant={color} onClick={props.handleSignUp}>{participationStatus}</Button>
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
        <h4> {props.length} </h4>
        </Col>
        <Col>
        <h4> {props.userCount} </h4>
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
