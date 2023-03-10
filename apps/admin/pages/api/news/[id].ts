import nextConnect from 'next-connect';
import middleware from 'middleware/database';
import { ObjectId } from 'mongodb';
import { ApiRequest, ApiResponse } from '@ontour/types';
import { getQueryValue } from 'utils/getQueryValue';

const handler = nextConnect();

handler.use(middleware);

handler.get<ApiRequest, ApiResponse>(async (req, res) => {
  const { id } = req.query;
  const doc = await req.db
    .collection('news')
    .findOne({ _id: new ObjectId(getQueryValue(id)) });

  return res.json(doc);
});

handler.put<ApiRequest, ApiResponse>(async (req, res) => {
  const { body, query } = req;
  const data = JSON.parse(body);
  const doc = await req.db
    .collection('news')
    .updateOne({ _id: new ObjectId(getQueryValue(query.id)) }, { $set: data });

  return res.json({ message: 'ok' });
});

handler.delete<ApiRequest, ApiResponse>(async (req, res) => {
  const { id } = req.query;
  const doc = await req.db
    .collection('news')
    .deleteOne({ _id: new ObjectId(getQueryValue(id)) });

  return res.json({ message: 'ok' });
});

export default handler;
