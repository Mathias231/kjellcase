import React, { useEffect, useState } from 'react';
import { GoogleChartWrapperChartType } from 'react-google-charts';
import Select, { MultiValue, SingleValue } from 'react-select';

import ChartComponent, { IChartComponentProps } from './barChart';

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

interface chartListProps extends Omit<IChartComponentProps, 'chartType'> {
  fagListData: IFagOptions[];
}

function ChartList({ headers, fagListData, chartData }: chartListProps) {
  const [fagList, setFagList] = useState<IFagOptions[]>([]);
  const [chartType, setChartType] =
    useState<GoogleChartWrapperChartType>('ColumnChart');
  useEffect(() => {
    setFagList(fagListData);
    return;
  }, [fagListData]);
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
  console.log(filtered);
  return (
    <div>
      <div>
        <Select options={options} onChange={handleChange} />
        <Select isMulti={true} options={fagList} onChange={handleFagChange} />
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
