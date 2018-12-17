import React from 'react';
import './daily-summary.css';
import { TrendingUp, TrendingDown } from '@material-ui/icons';

// <TrendingDown style={{ fill: 'red', height: '50px', width: '50px', }} />

const DailySummary = () => (
    <div className="daily-summary-container">
      <div className="left-side-container">
        <h3>April 10, 2018</h3>
        <h3>Number of Products Sold</h3>
        <h4>125</h4>
        <h3>Total Revenue April 10</h3>
        <h4>$8,000</h4>
      </div>
      <div className="right-side-container">
        <TrendingUp  style={{ fill: 'green', height: '50px', width: '50px' }}/>
        <h4 className="daily-percentage">0.78%</h4>
      </div>
    </div>
  )


export default DailySummary;