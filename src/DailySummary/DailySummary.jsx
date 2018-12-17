import React from 'react';
import './daily-summary.css';
import { TrendingUp, TrendingDown } from '@material-ui/icons';
import moment from 'moment';

const num = 0.88
const num2 = 0.8

const DailySummary = ({ summaryData,find }) => {
  const findStuff = find(summaryData.date)
  console.log(findStuff)
  const selectedDate = summaryData.date ? (<h3>{summaryData.date}</h3>) : (<h3>Selected Date</h3>);
  const priceUp = num > num2 ? 'increase' : 'decrease';
  const showIcon = num > num2 
    ? <TrendingUp  style={{ fill: 'green', height: '115px', width: '115px' }} />
    : <TrendingDown style={{ fill: 'red', height: '115px', width: '115px', }} />;
    return (
    <div className="daily-summary-container">
      <div className="left-side-container">
        {selectedDate}
        <h3>Number of Products Sold</h3>
        <h4>125</h4>
        <h3>Total Revenue For {moment(summaryData.date).format("MMM Do")}</h3>
        <h4>$8,000</h4>
      </div>
      <div className="right-side-container">
        <div className="icon-area">
          {showIcon}
          <h4 className={priceUp}>{num2}%</h4>
        </div>
      </div>
    </div>
    )
  }



export default DailySummary;