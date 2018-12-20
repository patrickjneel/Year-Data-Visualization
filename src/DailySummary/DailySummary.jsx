import React from 'react';
import './daily-summary.css';
import moment from 'moment';

const DailySummary = ({ summaryData, selectedDateData, dailyRev }) => {
  const currencyArr = selectedDateData(summaryData.date)
  let revenue = currencyArr
    .map(revenue => parseInt(revenue.properties.orderTotal))
    .reduce((accum, currentVal) => accum + currentVal, 0);
  let currency = revenue
    .toFixed(2)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const selectedDate = summaryData.date 
    ? (<span className="date-shown">{moment(summaryData.date).format("MMM Do")}</span>) 
    : (<span className="date-shown">Selected Date</span>);
  const compareDailyAvgRev = parseFloat(dailyRev.replace(/[^0-9-.]/g, ''));
  const compareDailyRev = parseFloat(currency.replace(/[^0-9-.]/g, ''));
  const average = ((compareDailyRev - compareDailyAvgRev) / compareDailyAvgRev) * 100;
  const comparisonRev = parseInt(dailyRev) > parseInt(currency)
    ? (<span className="percentage low">{average.toFixed(2)}%</span>) 
    : (<span className="percentage high">+{average.toFixed(2)}%</span>)
    const ridZero = average.toString() === '-100' ? (<span className="percentage neutral">0%</span>) : comparisonRev;
    const nutrienlogo = (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        className="nutrien-logo"
      >
        <g>
          <path d="M20.3,0l-4.5,17.4c0.9,2.3,1.8,4.3,3.2,5.5l5-19.1l0-0.2C24,3.5,24,3.3,24,3C24,1.2,22.4,0.1,20.3,0" />
          <path d="M3.4,10.8L0.1,23.6h4.6l1.9-7.4C5.8,13.7,4.9,11.8,3.4,10.8" />
          <path
            className="st0"
            d="M16.4,20.7c-0.2-0.4-1.2-2.3-2-4.9c-0.8-2.6-1.6-5.8-2-7.5c-0.8-3.4-2.2-6.6-6.2-7.8C4.8,0.1,2.5,0,1.1,0
        C0.4,0,0,0,0,0s2.9,1.9,4.6,5c1.1,2,1.3,3.7,1.5,4.3c3.3,0.1,4.6,1.6,6.5,4.9c0.4,0.7,0.9,1.5,1.3,2.2l0,0l0,0
        c-0.6-0.9-1.3-1.9-1.9-2.8c-1.4-1.8-3.1-3.6-5.8-3.6c-0.6,0-0.8,0-1.1,0c-0.2,0-0.6,0-1.5,0c2.9,1.6,3.1,5.7,5,8.2
        c1.7,2.4,3.2,4.4,7.5,5.2c0.6,0.1,2,0.3,2.7,0.3C17.8,23,17.2,22,16.4,20.7z"
          />
        </g>
      </svg>
    );
  return (
    <div className="daily-summary-container">
      <div className="all-top-card">
        <div className="top-card">
          {selectedDate}
          {ridZero}
        </div>
        <div className="logo-area">
          {nutrienlogo}
        </div>
      </div>
      <div className="bottom-card">
        <span className="numbers-shown">Revenue: <span className="daily-totals">${currency}</span></span>
        <span className="numbers-shown products-right">Products Sold: <span className="daily-totals">125</span></span>
      </div>
    </div>
    )
  }

export default DailySummary;