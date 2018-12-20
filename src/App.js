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

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  selectedDateGhetto = (date) => {
    let arr = [...orders.features];
      arr = this.shuffle(arr)
    var half_length = Math.ceil(arr.length / 12)
    return arr.splice(0, half_length)
  }

  onMouseMove = (data) => {
    this.setState({ data });
  }

  render() {
    return (
      <div className="app-page">
        <div className="app-left">
            <RadialChart weatherData={weatherData2018} mouseMove={this.onMouseMove}/>
          <div className="daily-summary">
            <DailySummary
              summaryData={this.state.data}
              selectedDateData={this.selectedDate}
              dailyRev={this.state.dailyRev}
            />
          </div>
        </div>
        <div className="globe-container">
          <Globe orders={orders} summaryData={this.state.data} selectedDate={this.selectedDate}/>
        </div>
      </div>
    );
  }
}

export default App;
