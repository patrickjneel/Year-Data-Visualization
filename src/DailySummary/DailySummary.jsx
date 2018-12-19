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
  return (
    <div className="daily-summary-container">
      <div className="top-card">
        {selectedDate}
        {comparisonRev}
      </div>
      <div className="bottom-card">
        <span className="numbers-shown">Revenue: <span className="daily-totals">${currency}</span></span>
        <span className="numbers-shown products-right">Products Sold: <span className="daily-totals">125</span></span>
      </div>
    </div>
    )
  }



export default DailySummary;