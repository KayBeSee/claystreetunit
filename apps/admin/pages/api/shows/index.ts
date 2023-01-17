import nextConnect from 'next-connect';

import { CreateShowFormInput, ontour, Prisma } from '@ontour/archive';
import { getSetlistQuery, getVenueQuery } from './util';

const handler = nextConnect();

handler.get(async (req, res) => {
  const shows = await ontour.show.findMany();
  res.json(shows);
});

handler.post(async (req, res) => {
  try {
    const show: CreateShowFormInput = JSON.parse(req.body);

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
  } catch (e) {
    console.log('error: ', e);
    console.log('error message: ', e.message);
  }
});

// handler.put(async (req, res) => {
//   const data = JSON.parse(req.body);
//   const doc = await req.db
//     .collection('news')
//     .updateOne({ id: data.id }, { $set: data }, { upsert: true });

//   res.json({ message: 'ok' });
// });

export default handler;
