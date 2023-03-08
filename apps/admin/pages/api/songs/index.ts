import type { NextApiRequest, NextApiResponse } from 'next';

import { ontour } from '@ontour/archive';

export default async function songHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const songs = await ontour.song.findMany();
      return res.json(songs);
    }
  }
}
