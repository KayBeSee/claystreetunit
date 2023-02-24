import nextConnect from 'next-connect';
import middleware from 'middleware/database';
import { ontour } from '@ontour/archive';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    if (!data.email) {
      throw new Error('Please provide an email address');
    }

    await ontour.user.create({ data: { email: data.email } });

    return res.json({ message: 'ok' });
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(500).end('Already subscribed');
    } else {
      res.status(500).end('Try again');
    }
  }
});

export default handler;
