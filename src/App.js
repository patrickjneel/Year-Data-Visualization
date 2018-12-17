import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import RadialChart from './YearlyChart/RadialChart';
import './App.css';
import weatherData2018 from '../src/db/weather2018.json';
import orders from '../src/db/orders.json';

class App extends Component {

  componentDidMount() {
  }
  
  render() {
    return (
      <div className="app">
          
          <RadialChart weatherData={weatherData2018}/>
        <div className="daily-summary">
          <DailySummary />
        </div>
      </div>
    );
  }
}

export default App;
