import nextConnect from 'next-connect';
import middleware from 'middleware/database';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  const doc = await req.db
    .collection('news')
    .findOne({ _id: new ObjectId(id) });

  return res.json(doc);
});

handler.put(async (req, res) => {
  const { body, query } = req;
  const data = JSON.parse(body);
  const doc = await req.db
    .collection('news')
    .updateOne({ _id: ObjectId(query.id) }, { $set: data });

  return res.json({ message: 'ok' });
});

handler.delete(async (req, res) => {
  const { id } = req.query;
  const doc = await req.db
    .collection('news')
    .deleteOne({ _id: new ObjectId(id) });

  return res.json({ message: 'ok' });
});

export default handler;
