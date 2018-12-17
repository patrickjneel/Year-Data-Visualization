import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import RadialChart from './YearlyChart/RadialChart';
import './App.css';
import weatherData2018 from '../src/db/weather2018.json';
import orders from '../src/db/orders.json';

class App extends Component {
  state = {
    data: {},
  }

  componentWillMount() {
  }

  onMouseMove = (data) => {
    this.setState({ data });
  }

  render() {
    const { x, y } = this.state;
    return (
      <div className="app">
        <div>
          <RadialChart weatherData={weatherData2018} mouseMove={this.onMouseMove}/>
        </div>
        <div className="daily-summary">
          <DailySummary summaryData={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
