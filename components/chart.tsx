// Imports
import React, { useState, useEffect } from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';
import { Chart } from 'react-google-charts';
import { GoogleChartWrapperChartType } from 'react-google-charts/dist/types';
import { ChartData, fetchData, fetchFag } from '../lib/client/fetchServerData';
import { FagRatingArrayWithoutHeaders } from '../lib/data/fetchData';

// Interfaces
interface IOption {
  value: string;
  label: string;
}

interface IFagOptions {
  value: string;
  label: string;
  selected: boolean;
}

// Options for Select button
const options: IOption[] = [
  { value: 'AreaChart', label: 'AreaChart' },
  { value: 'Bar', label: 'Bar' },
  { value: 'BarChart', label: 'BarChart' },
  { value: 'BubbleChart', label: 'BubbleChart' },
  { value: 'ColumnChart', label: 'ColumnChart' },
  { value: 'ScatterChart', label: 'ScatterChart' },
];

function ChartComponent() {
  // States
  const [chartData, setChartData] =
    useState<FagRatingArrayWithoutHeaders | null>(null);
  const [chartType, setChartType] =
    useState<GoogleChartWrapperChartType>('ColumnChart');
  const [headers, setHeaders] = useState<ChartData>([]);
  const [fagList, setFagList] = useState<IFagOptions[]>([]);

  // Fetching data from readFile.ts
  useEffect(() => {
    fetchData().then((data) => {
      if (data && data.length > 0) {
        let first = data.shift();
        if (first) setHeaders(first);
        setChartData(data as FagRatingArrayWithoutHeaders);
      }
    });
  }, [fagList]);

  // Fetching FAG names from fetchServerData.ts
  useEffect(() => {
    fetchFag().then((data) => {
      if (data && data.length > 0) {
        setFagList(
          data.map((item) => {
            return {
              value: item,
              label: item,
              selected: false,
            };
          }),
        );
      }
    });
  }, []);

  if (chartData === null || typeof chartData[0] === 'undefined')
    return <div>Loading...</div>;

  const averageRating = chartData
    .sort((a, b) => {
      return a[0].toString().localeCompare(b[0].toString());
    })
    .filter((fagRating) => {
      let name = fagRating[0].toString();
      let foundSelected = fagList.find((selectedFag) => {
        return selectedFag.selected && selectedFag.value === name;
      });
      return foundSelected;
    });

  const handleChange = (e: SingleValue<IOption>) => {
    setChartType(e?.value as GoogleChartWrapperChartType);
  };

  const handleFagChange = (e: MultiValue<IFagOptions>) => {
    setFagList((fagList) => {
      return fagList.map((fag) => {
        let foundSelected = e.find((selectedFag) => {
          return selectedFag.value === fag.value;
        });
        if (foundSelected) fag.selected = true;
        else fag.selected = false;
        return fag;
      });
    });
  };

  return (
    <div className="chart-container">
      <div className="selectDiv">
        <Select options={options} onChange={handleChange} />
        <Select isMulti={true} options={fagList} onChange={handleFagChange} />
      </div>
      {chartType && averageRating.length > 0 && (
        <Chart
          chartType={chartType}
          data={[headers, ...averageRating]}
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
      )}
    </div>
  );
}

export default ChartComponent;
