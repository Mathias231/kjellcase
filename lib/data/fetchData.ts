import { readFile } from 'fs/promises';

// Types
import { FagRatingArray } from '../../interfaces/options.interface';

async function fetchData() {
  const file = await readFile('./lib/data/fakeData.csv', 'utf-8');

  const allData = file.split(/\r?\n/).map((line: string, i) => {
    let [FAG, SPM1, SPM2, SPM3, SPM4, SPM5] = line.split(',').map((l) => {
      if (!isNaN(Number(l))) return parseInt(l);
      return l;
    });
    if (i === 0) return [FAG, SPM1, SPM2, SPM3, SPM4, SPM5] as string[];

    return [FAG, SPM1, SPM2, SPM3, SPM4, SPM5];
  }) as FagRatingArray;
  return allData;
}

export default fetchData;
