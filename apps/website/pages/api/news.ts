import nextConnect from 'next-connect';
import middleware from 'middleware/database';
import { ApiRequest, ApiResponse } from '@ontour/types';

const handler = nextConnect();

handler.use(middleware);

handler.get<ApiRequest, ApiResponse>(async (req, res) => {
  const doc = await req.db.collection('news').find().toArray();

  return res.json(doc);
});

handler.post<ApiRequest, ApiResponse>(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  data.date = new Date(data.date);
  let doc = await req.db
    .collection('news')
    .updateOne({ date: new Date(data.date) }, { $set: data }, { upsert: true });

  return res.json({ message: 'ok' });
});

export default handler;
