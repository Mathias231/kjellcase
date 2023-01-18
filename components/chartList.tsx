import React, { useEffect, useState } from 'react';
import { GoogleChartWrapperChartType } from 'react-google-charts';
import Select, { MultiValue, SingleValue } from 'react-select';
import ChartComponent from './barChart';

// Interfaces
import {
  IOption,
  IFagOptions,
  IChartComponentProps,
} from '../interfaces/options.interface';

// Options for Select button
const options: IOption[] = [
  { value: 'AreaChart', label: 'AreaChart' },
  { value: 'Bar', label: 'Bar' },
  { value: 'BarChart', label: 'BarChart' },
  { value: 'BubbleChart', label: 'BubbleChart' },
  { value: 'ColumnChart', label: 'ColumnChart' },
  { value: 'ScatterChart', label: 'ScatterChart' },
];

interface chartListProps extends Omit<IChartComponentProps, 'chartType'> {
  fagListData: IFagOptions[];
}

function ChartList({ headers, fagListData, chartData }: chartListProps) {
  // States
  const [fagList, setFagList] = useState<IFagOptions[]>([]);
  const [chartType, setChartType] =
    useState<GoogleChartWrapperChartType>('ColumnChart');

  // Fetching fagListData
  useEffect(() => {
    setFagList(fagListData);
    return;
  }, [fagListData]);

  // Sorting the data and then filtering it
  const filtered = chartData
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

  /**
   * It sets the chart type to the value of the selected option.
   * @param e - SingleValue<IOption>
   */
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
    <div>
      <div className="selectDiv">
        <div className="selectChart">
          <h2>Velg Graf</h2>
          <Select options={options} onChange={handleChange} />
        </div>
        <div className="selectFag">
          <h2>Velg Fag</h2>
          <Select isMulti={true} options={fagList} onChange={handleFagChange} />
        </div>
      </div>
      <ChartComponent
        chartData={filtered}
        headers={headers}
        chartType={chartType}
      />
    </div>
  );
}

export default ChartList;
