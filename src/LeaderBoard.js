import React, {setState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

class LeaderBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leaders: []
    }
  }
  componentDidMount(){
    var self = this;
    axios.get('/leaderboard').then(
      (response) => {
          console.log(response.data);
          self.setState({
            leaders: response.data
          }
          )
        }
          ,
          (error) => {
              self.setState({error})
            })
  }
  render(){
    var self = this;
    console.log(this.state.leaders);
  return(
      <ul>
            {this.state.leaders.map(item => (
              <li>{item.name}  :  {item.score}</li>
            ))}
      </ul>
        )
      }
}
export {LeaderBoard}
