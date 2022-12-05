import nextConnect from 'next-connect';
import middleware from 'middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const doc = await req.db
    .collection('news')
    .find()
    .sort({ datetime: -1 })
    .toArray();

  res.json(doc);
});

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  const doc = await req.db.collection('news').insertOne(data);

  res.json({ message: 'ok' });
});

handler.put(async (req, res) => {
  const data = JSON.parse(req.body);
  const doc = await req.db
    .collection('news')
    .updateOne({ id: data.id }, { $set: data }, { upsert: true });

  res.json({ message: 'ok' });
});

export default handler;
