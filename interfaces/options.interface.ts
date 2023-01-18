// Import
import { GoogleChartWrapperChartType } from 'react-google-charts';

// Defined Interfaces
export interface IOption {
  value: string;
  label: string;
}

export interface IFagOptions {
  value: string;
  label: string;
  selected: boolean;
}

export interface IChartComponentProps {
  headers: ChartData;
  chartData: FagRatingArrayWithoutHeaders;
  chartType: GoogleChartWrapperChartType;
}

// Defined Types
export type FagRatingArray = [string[], ...Array<[string, ...number[]]>];
export type FagRatingArrayWithoutHeaders = [...Array<[string, ...number[]]>];
export type ChartData = (string | number)[];
export type FagArray = string[];
