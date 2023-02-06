import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

export async function createImageUpload(folder: string) {
  const timestamp = new Date().getTime();
  const signature = await cloudinary.utils.api_sign_request(
    {
      upload_preset: 'lmicqrpq',
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_SECRET
  );
  return { timestamp, signature };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'POST': {
      const { folder } = JSON.parse(body);
      const result = await createImageUpload(folder);
      res.json(result);
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
