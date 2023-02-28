import type { NextApiRequest, NextApiResponse } from 'next';

import { CreateShowFormInput, ontour, Prisma } from '@ontour/archive';
import { getSetlistQuery, getVenueQuery } from './util';

export default async function showHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'GET': {
      const shows = await ontour.show.findMany({
        orderBy: [{ date: 'desc' }],
      });
      res.json(shows);
      break;
    }
    case 'POST': {
      try {
        const show: CreateShowFormInput = JSON.parse(body);

        const venueQuery = getVenueQuery(show.venue);

        const setlistQuery = getSetlistQuery(show.setlist);

        const showData: Prisma.ShowCreateInput = {
          date: new Date(show.date),
          eventName: show.eventName,
          notes: show.notes,
          venue: venueQuery,
          setlist: setlistQuery,
        };

        const createdShow = await ontour.show.create({
          data: showData,
          include: {
            venue: true,
            setlist: true,
          },
        });

        res.json(createdShow);
        break;
      } catch (e) {
        console.log('error: ', e);
        console.log('error message: ', e.message);
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
