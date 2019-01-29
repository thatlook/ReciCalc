import React from 'react';
import { Chart, Axis, Series, Tooltip, Pie } from 'react-charts';

const PieChart = props => (
  <div>
    <h3>Your Nutrients</h3>
    <div id="chart">
      <Chart data={props.data}>
        <Axis type="pie" />
        <Series type={Pie} showPoints={false} />
        <Tooltip />
      </Chart>
    </div>
  </div>
);

export default PieChart;
