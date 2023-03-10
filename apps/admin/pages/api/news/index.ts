import nextConnect from 'next-connect';
import middleware from 'middleware/database';
import { ApiRequest, ApiResponse } from '@ontour/types';

const handler = nextConnect();

handler.use(middleware);

handler.get<ApiRequest, ApiResponse>(async (req, res) => {
  const doc = await req.db
    .collection('news')
    .find()
    .sort({ datetime: -1 })
    .toArray();

  return res.json(doc);
});

handler.post<ApiRequest, ApiResponse>(async (req, res) => {
  const data = JSON.parse(req.body);
  const doc = await req.db.collection('news').insertOne(data);

  return res.json({ message: 'ok' });
});

handler.put<ApiRequest, ApiResponse>(async (req, res) => {
  const data = JSON.parse(req.body);
  const doc = await req.db
    .collection('news')
    .updateOne({ id: data.id }, { $set: data }, { upsert: true });

  return res.json({ message: 'ok' });
});

export default handler;
