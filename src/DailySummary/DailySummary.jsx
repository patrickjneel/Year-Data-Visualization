import React from 'react';
import './daily-summary.css';
import { TrendingUp, TrendingDown } from '@material-ui/icons';
import moment from 'moment';

const DailySummary = ({ summaryData, selectedDateData }) => {
  const currencyArr = selectedDateData(summaryData.date)
  let revenue = currencyArr
    .map(revenue => parseInt(revenue.properties.orderTotal))
    .reduce((accum, currentVal) => accum + currentVal, 0);
  let currency = revenue
    .toFixed(2)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const selectedDate = summaryData.date 
    ? (<span className="date-shown" cla>{moment(summaryData.date).format("MMM Do")}</span>) 
    : (<span className="date-shown">Selected Date</span>);
  // const priceUp = num > num2 ? 'increase' : 'decrease';
  // const showIcon = num > num2 
  //   ? <TrendingUp  style={{ fill: 'green', height: '115px', width: '115px' }} />
  //   : <TrendingDown style={{ fill: 'red', height: '115px', width: '115px', }} />;
    return (
    <div className="daily-summary-container">
      <div className="top-card">
        {selectedDate}
        <span className="percentage">+7.8%</span>
      </div>
      <div className="bottom-card">
        <span className="numbers-shown">Revenue: <span className="daily-totals">${currency}</span></span>
        <span className="numbers-shown products-right">Products Sold: <span className="daily-totals">125</span></span>
      </div>
      {/* <div className="right-side-container">
        <div className="icon-area">
          {showIcon}
          <h4 className={priceUp}>{num2}%</h4>
        </div>
      </div> */}
    </div>
    )
  }



export default DailySummary;