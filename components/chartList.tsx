// Imports
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
  { value: 'ColumnChart', label: 'ColumnChart' },
  { value: 'ScatterChart', label: 'ScatterChart' },
];

interface chartListProps extends Omit<IChartComponentProps, 'chartType'> {
  fagListData: IFagOptions[];
}

function ChartList({ headers, fagListData, chartData }: chartListProps) {
  // Declaring states
  const [fagList, setFagList] = useState<IFagOptions[]>([]);
  const [chartType, setChartType] =
    useState<GoogleChartWrapperChartType>('ColumnChart'); // Default chart dispaly. One subject must be selected for chart to take effect.

  // Sets fagList variable with all subjects
  useEffect(() => {
    console.log(fagListData);
    setFagList(fagListData);
    return;
  }, [fagListData]);

  // Sorts subjects and then filters
  const filtered = chartData
    .sort((a, b) => {
      // Determines whether two strings are equivalent in the current or specified locale.
      return a[0].toString().localeCompare(b[0].toString()); // Returning number 1
    })
    .filter((fagRating) => {
      let name = fagRating[0].toString();

      // Finds selected subject
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
