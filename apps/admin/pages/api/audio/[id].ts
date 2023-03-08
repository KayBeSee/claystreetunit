import type { NextApiRequest, NextApiResponse } from 'next';

import { ontour } from '@ontour/archive';

export default async function audioSourceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  const audioId = Array.isArray(id) ? id[0] : id;

  switch (method) {
    case 'DELETE': {
      const audioSources = await ontour.audioSource.delete({
        where: {
          id: audioId,
        },
      });
      return res.json(audioSources);
    }
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
