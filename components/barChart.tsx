// Imports
import React, { useState, useEffect } from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';
import { Chart } from 'react-google-charts';
import { GoogleChartWrapperChartType } from 'react-google-charts/dist/types';
import { ChartData, fetchData, fetchFag } from '../lib/client/fetchServerData';
import { FagRatingArrayWithoutHeaders } from '../lib/data/fetchData';

// Interfaces
// interface IFagOptions {
//   value: string;
//   label: string;
//   selected: boolean;
// }

export interface IChartComponentProps {
  headers: ChartData;
  chartData: FagRatingArrayWithoutHeaders;
  chartType: GoogleChartWrapperChartType;
}

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
