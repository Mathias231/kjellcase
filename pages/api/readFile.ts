// Import
import type { NextApiRequest, NextApiResponse } from 'next';
import fetchData from '../../lib/data/fetchData';

// Interfaces
import { IFag } from '../../interfaces/options.interface';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  let file = await fetchData();
  let headers = file.shift();
  let split = file.reduce((prev, curr) => {
    let found = prev.find((find) => find.fag === curr[0]);

    if (!found)
      prev.push({
        fag: curr[0],
        ratings: [curr.slice(1) as number[]],
      });
    else {
      found.ratings.push(curr.slice(1) as number[]);
    }

    return prev;
  }, [] as IFag[]);

  let average = split.map((item) => {
    let summedRating = item.ratings
      .reduce((prev, curr, _i) => {
        for (let i = 0; i < curr.length; i++) {
          if (typeof prev[i] === 'number') prev[i] += curr[i];
          else prev[i] = curr[i];
        }
        return prev;
      }, [] as number[])
      .map((rating) => {
        let result = rating / item.ratings.length;
        return result;
      });
    return [item.fag, ...summedRating];
  });

  res.status(200).json({
    data: [headers, ...average],
  });
}
