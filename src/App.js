import React, { Component } from 'react';
import DailySummary from './DailySummary/DailySummary';
import RadialChart from './YearlyChart/RadialChart';
import './App.css';
import weatherData2018 from '../src/db/weather2018.json';
import orders from '../src/db/orders.json';

class App extends Component {
  state = {
    x: 0, 
    y: 0,
  }

  _onMouseMove = (e) => {
    this.setState({ x: e.screenX, y: e.screenY });
  }
  
  render() {
    const { x, y } = this.state;
    return (
      <div className="app">
        <div onMouseMove={this._onMouseMove}>
          <RadialChart weatherData={weatherData2018}/>
          <h1>Mouse Coordinates: { x } { y }</h1>
        </div>
        <div className="daily-summary">
          <DailySummary />
        </div>
      </div>
    );
  }
}

export default App;
