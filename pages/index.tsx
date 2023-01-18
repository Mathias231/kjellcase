import { useEffect, useState } from 'react';
import { ChartData, fetchData, fetchFag } from '../lib/client/fetchServerData';
import ChartComponent from '../components/barChart';
import { FagRatingArrayWithoutHeaders } from '../lib/data/fetchData';
import ChartList from '../components/chartList';
import Head from 'next/head';

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

export default function Home() {
  // States
  const [chartData, setChartData] =
    useState<FagRatingArrayWithoutHeaders | null>(null);
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

  return (
    <>
      <Head>
        <title>Kjellcase</title>
      </Head>
      <main>
        {chartData && (
          <ChartList
            chartData={chartData}
            fagListData={fagList}
            headers={headers}
          />
        )}
      </main>
    </>
  );
}
