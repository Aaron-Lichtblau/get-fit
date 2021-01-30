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
  handleSignUp(challengeName){
    console.log('signed up to:');
    console.log(challengeName);

    // change active status
    // add challenge/progress of 0 to unique users' table
    // add +1 to participants of Challenges table 
  }

  renderChallengeBox(challengeBox){
    console.log(challengeBox);
    var self = this;
    return(
      <ChallengeBox
      challengeName={challengeBox['challengeName']}
      description={challengeBox['description']}
      startDate={challengeBox['startDate']}
      length={challengeBox['length']}
      userCount={challengeBox['userCount']}
      handleSignUp={self.handleSignUp}
      active={challengeBox['active']}>
      </ChallengeBox>
    );
  }
  getChallengeBoxesContent(challenges) {
    console.log(challenges);
    var self = this;
    let content = [];
    for (let i = 0; i < challenges.length; i++) {
      const challengeObject = challenges[i];
      const challengeName = challengeObject.challengeName;
      const startDate = challengeObject.startDate;
      const len = challengeObject.len;
      const userCount = challengeObject.userCount;
      const active = self.state.activeChallenges[i];
      const challengeBox = {challengeName: challengeName, startDate: startDate, length: len, userCount: userCount, active: active};
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
    <Button variant={color} onClick={() => props.handleSignUp(props.challengeName)}>{participationStatus}</Button>
  );
}

function ChallengeBox(props){
  console.log(props.handleSignUp);
  return(
    <div className="ChallengeBox">
    <br></br>
    <Container>
        <Col>
        <p>  {props.challengeName} Challenge</p>
        </Col>
        <Col>
        <p> Started On: {props.startDate} </p>
        </Col>
        <Col>
        <p> Workouts to Complete: {props.length} </p>
        </Col>
        <Col>
        <p> Number of Participants: {props.userCount} </p>
        </Col>
        <Col>
        <SignUpButton active={props.active} handleSignUp={props.handleSignUp} challengeName={props.challengeName}></SignUpButton>
        </Col>
    </Container>
    <br></br>
    </div>
  );
}
export {ChallengeBoard};
