import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import YearlyChart from './YearlyChart/YearlyChart';
import './App.css';
import weatherData from '../src/db/weather2018.json';
import orders from '../src/db/orders.json';

class App extends Component {

  componentDidMount() {

  }
  
  render() {
    return (
      <div className="app">
        <div className="graph-area">
          <YearlyChart />
        </div>
        <div className="daily-summary">
          <DailySummary />
        </div>
      </div>
    );
  }
}

export default App;
