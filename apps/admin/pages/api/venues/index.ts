import type { NextApiRequest, NextApiResponse } from 'next';

import { ontour } from '@ontour/archive';

export default async function venueHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const venues = await ontour.venue.findMany();
      res.json(venues);
    }
  }
}
