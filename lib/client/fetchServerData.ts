import { FagRatingArray } from '../data/fetchData';

export type ChartData = (string | number)[];
export type ChartDataArray = ChartData[];
export type FagArray = string[];

export const fetchData = async (): Promise<FagRatingArray> => {
  let response = await fetch('http://localhost:3000/api/readFile').then((res) =>
    res.json(),
  );
  return response.data;
};

export const fetchFag = async (): Promise<FagArray> => {
  let response = await fetch('http://localhost:3000/api/getFag').then((res) =>
    res.json(),
  );
  return response.data;
};
