import type { NextApiRequest, NextApiResponse } from 'next';

import { ontour } from '@ontour/archive';
import { getDecoratedAudioSource } from './util';

export default async function audioSourceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  const showId = Array.isArray(id) ? id[0] : id;

  switch (method) {
    case 'GET': {
      console.log('hits GET');
      const audioSources = await ontour.audioSource.findMany({
        where: { showId },
      });

      const decoratedAudioSources = await Promise.all(
        audioSources.map(async (item) => {
          return await getDecoratedAudioSource(item);
        })
      );
      console.log('decoratedAudioSources: ', decoratedAudioSources);

      return res.json(decoratedAudioSources);
    }
    case 'POST': {
      console.log('hits POST');
      const audioSource = JSON.parse(body);

      // TODO: do some sort of verification using getDecoratedAudioSource before adding to db
      const createdAudioSource = await ontour.audioSource.create({
        data: { ...audioSource, showId },
      });
      return res.json(createdAudioSource);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
