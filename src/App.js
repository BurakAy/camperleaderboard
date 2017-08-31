import React, { Component } from 'react';
import axios from 'axios';
import CamperListItem from './camper_list_item';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topRecent: [],
      topAllTime: [],
      currentPoints: 'topRecent'
    };
  }

  componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
      .then(axios.spread((topRecent, topAllTime) => {
        this.setState({
          topRecent: topRecent.data,
          topAllTime: topAllTime.data
        });
      }));
  }

  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAllTimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changePoints(currentPoints) {
    this.setState({ currentPoints });
  }

  render() {
    const campers = this.state[this.state.currentPoints];
    const items = campers.map((camper, index) => {
        return <CamperListItem key={index} camper={camper} number={index + 1} />
    });

    return (
      <div className="wrapper">
        <h1>Camper Leaderboard&nbsp;<i className="fa fa-free-code-camp" aria-hidden="true"></i></h1>
        <table className="campertable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Camper Name</th>
                    <th id="toprecent" onClick={() => this.changePoints('topRecent')}>Last 30 Days&nbsp;&nbsp;{this.state.currentPoints == 'topRecent' && (<i className="fa fa-caret-down"></i>)}</th>
                    <th id="topall" onClick={() => this.changePoints('topAllTime')}>All Time Points&nbsp;&nbsp;{this.state.currentPoints == 'topAllTime' && (<i className="fa fa-caret-down"></i>)}</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
      </div>
    );
  }
}

export default App;
