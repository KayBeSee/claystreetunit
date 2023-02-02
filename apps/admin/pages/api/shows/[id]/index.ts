import { ontour, UpdateShowFormInput } from '@ontour/archive';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSetlistQuery, getVenueQuery } from '../util';

export default async function showHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case 'GET': {
      const show = await ontour.show.findFirst({
        where: { id: { in: id } },
        include: {
          setlist: {
            include: {
              tracks: { orderBy: { position: 'asc' }, include: { song: true } },
            },
          },
          venue: true,
          audioSources: true,
        },
      });

      delete show.venueId;

      for (let i = 0; i < show.setlist.length; i++) {
        delete show.setlist[i].showId;

        for (let j = 0; j < show.setlist[i].tracks.length; j++) {
          delete show.setlist[i].tracks[j].setID;
          delete show.setlist[i].tracks[j].songId;
        }
      }

      res.status(200).json(show);
      break;
    }
    case 'PUT': {
      const show: UpdateShowFormInput = JSON.parse(body);

      const venueQuery = getVenueQuery(show.venue);
      const setlistQuery = getSetlistQuery(show.setlist);

      const { id, ...showWithoutId } = show;

      const data = {
        ...showWithoutId,
        venue: venueQuery,
        setlist: setlistQuery,
      };

      const updatedShow = await ontour.show.update({
        where: {
          id: id,
        },
        data,
        include: {
          venue: true,
          setlist: true,
        },
      });

      res.status(200).json(updatedShow);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
