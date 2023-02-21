import nextConnect from 'next-connect';
import middleware from 'middleware/database';

import axios from 'axios';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    const { data: resp } = await axios.post(
      `https://api.e2ma.net/${process.env.EMMA_ACCOUNT_ID}/members/add`,
      { email: data.email },
      {
        auth: {
          username: process.env.EMMA_API_PUBLIC_KEY,
          password: process.env.EMMA_API_PRIVATE_KEY,
        },
      }
    );
    res.json({ message: 'ok' });
  } catch (e) {
    console.log('e.message: ', e.message);
    res.status(500).end('Something broke!');
  }
});

export default handler;
