import { useEffect, useState } from 'react';
import { fetchData, fetchFag } from '../lib/client/fetchServerData';
import ChartList from '../components/chartList';
import Head from 'next/head';

// Interfaces
import {
  IFagOptions,
  FagRatingArrayWithoutHeaders,
  ChartData,
} from '../interfaces/options.interface';

export default function Home() {
  // States
  const [chartData, setChartData] =
    useState<FagRatingArrayWithoutHeaders | null>(null);
  const [headers, setHeaders] = useState<ChartData>([]);
  const [fagList, setFagList] = useState<IFagOptions[]>([]);
  const [themeMode, setThemeMode] = useState<boolean>(true);
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

  // Change light/dark mode
  const changeColorTheme = () => {
    setThemeMode(!themeMode);

    console.log(themeMode);
    if (themeMode) {
      document.documentElement.style.setProperty('--bg-color', '#323639'); // Background color
      document.documentElement.style.setProperty('--text-color', 'white'); // h2 text color
    } else {
      document.documentElement.style.setProperty('--bg-color', 'white');
      document.documentElement.style.setProperty('--text-color', 'black'); // h2 text color
    }
  };
  return (
    <>
      <Head>
        <title>Kjellcase</title>
      </Head>
      <main>
        <div>
          <input type="file" name="file" id="file" className="inputFile" />
          <label htmlFor="file">Choose a file</label>
        </div>
        <div>
          <button onClick={changeColorTheme}>Change color</button>
        </div>
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
