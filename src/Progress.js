import React from 'react';
import './App.css';
import axios from "axios";
import { ChallengeModal } from './ChallengeModal';
import {Container, Row, Col} from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class ChallengeTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      challenges: [],
      descriptions: [],
      progresses: []
    };
  }
  componentDidMount(){
    var self = this;

    const getChalProg = async () => {
        try {
              const res = await axios.get('/progressboard');
              self.setState({
                challenges: res.data.challenges,
                progresses: res.data.progresses
              });
        }
        catch (err) {
          console.error(err);
        }

    }
    getChalProg();

  }
  // TO BE USED for info button on challenges (show description)
  // const getDesc = async () => {
  //   try {
  //     console.log('ok until here');
  //     const data = {
  //         challenges: self.state.challenges
  //       };
  //     console.log(data);
  //     console.log('about to post');
  //     const res = await axios.post('/getdescriptions',data);
  //     self.setState({
  //       descriptions: res.data.descriptions
  //     });
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // }

  renderChallengeProgress(challengeProgress){
    return(
      <ChallengeProgress
      challenge={challengeProgress['challenge']}
      description={challengeProgress['description']}
      progress={challengeProgress['progress']}>
      </ChallengeProgress>
    );
  }
  getChallengesContent(challenges) {
    let content = [];
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const description = this.state.descriptions[i];
      const progress = this.state.progresses[i];
      const challengeProgress = {challenge: challenge, description: description, progress: progress};
      content.push(<li>{this.renderChallengeProgress(challengeProgress)}</li>);
    }
    return content;
  }

  render(){
    {/* challengeProgress : {name: ChallengeName, desc: ChalDesc, progress: PercentComplete} */}
    return <ul>{this.getChallengesContent(this.state.challenges)}</ul>;
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
    <br></br>
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
