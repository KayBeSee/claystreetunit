import nextConnect from 'next-connect';

import { ontour } from '@ontour/archive';

const handler = nextConnect();

handler.get(async (req, res) => {
  const venues = await ontour.venue.findMany();
  res.json(venues);
});

export default handler;
