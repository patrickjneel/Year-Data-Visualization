import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import RadialChart from './YearlyChart/RadialChart';
import Globe from './Globe/Globe.jsx';
import './App.css';
import weatherData2018 from '../src/db/weather2018.json';
import orders from '../src/db/orders.json';

class App extends Component {
  state = {
    data: {},
    dailyRev: 0,
  }

  componentWillMount() {
    let dailyAvg = orders.features
      .map(rev => parseInt(rev.properties.orderTotal))
      .reduce((a,b) => a + b / 365)
      .toFixed(2)
      .toString()
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    this.setState({ dailyRev: dailyAvg })
  }

  selectedDate = date => (
    orders.features.filter(day => day.properties.createdDate === date)
  );

  onMouseMove = (data) => {
    this.setState({ data });
  }

  render() {
    return (
      <div className="app">
          <RadialChart weatherData={weatherData2018} mouseMove={this.onMouseMove}/>
        <div className="daily-summary">
          <DailySummary summaryData={this.state.data} selectedDateData={this.selectedDate}/>
        </div>
        <Globe />
      </div>
    );
  }
}

export default App;
