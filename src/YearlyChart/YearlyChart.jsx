import React from 'react';
import './yearly-chart.css';

const YearlyChart = () => {
  return (
    <div>
      Yearly Chart of Stuff lives here
    </div>
  )
}

export default YearlyChart;

// import React, { Component } from "react";
// import * as d3 from "d3";

// const width = 650;
// const height = 650;
// const margin = { top: 20, right: 5, bottom: 20, left: 35 };

// class Chart extends Component {
//   state = {
//     slices: []
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const { data } = nextProps;
//     if (!data) return {};

//     return {};
//   }

//   render() {
//     return <svg width={width} height={height} />;
//   }
// }

// export default Chart;