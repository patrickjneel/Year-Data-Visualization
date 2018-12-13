import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import YearlyChart from './YearlyChart/YearlyChart';
import './App.css';

class App extends Component {
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
