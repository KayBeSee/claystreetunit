import nextConnect from 'next-connect';
import { Prisma } from '@prisma/client';

import { ontour } from '@ontour/archive';

const handler = nextConnect();

handler.get(async (req, res) => {
  const songs = await ontour.song.findMany();
  res.json(songs);
});

export default handler;
