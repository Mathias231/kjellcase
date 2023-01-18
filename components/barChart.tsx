// Imports
import React from 'react';
import { Chart } from 'react-google-charts';

// Interfaces
import { IChartComponentProps } from '../interfaces/options.interface';

function ChartComponent({
  chartData,
  headers,
  chartType,
}: IChartComponentProps) {
  if (chartData === null || typeof chartData[0] === 'undefined')
    return <div className="message">Velg et fag...</div>;

  return (
    <div className="chart-container">
      <Chart
        chartType={chartType}
        data={[headers, ...chartData]}
        width="100%"
        height="400px"
        legendToggle
        options={{
          vAxis: {
            minValue: 0,
            maxValue: 5,
          },
          hAxis: {
            minValue: 0,
            maxValue: 5,
          },
        }}
      />
    </div>
  );
}

export default ChartComponent;
