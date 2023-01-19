// Imports
import type { NextApiRequest, NextApiResponse } from 'next';
import fetchData from '../../lib/data/fetchData';

// Types
import { Data } from '../../interfaces/options.interface';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let file = await fetchData();

  /* Removing the first row of the csv file, and then it is reducing the array to only contain the first
     column of the csv file. */
  let fagList = file.slice(1).reduce((prev, curr) => {
    if (!prev.includes(curr[0])) prev.push(curr[0].toString());

    return prev;
  }, [] as string[]) as string[];

  res.status(200).json({ data: fagList });
}
