import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';
import { getSlug } from 'utils/getSlug';

import { ontour } from '@ontour/archive';

export default async function audioSourceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  const showId = Array.isArray(id) ? id[0] : id;

  switch (method) {
    case 'GET': {
      try {
        const showId = Array.isArray(id) ? id[0] : id;

        const show = await ontour.show.findFirst({
          where: {
            id: showId,
          },
          include: {
            venue: true,
          },
        });

        cloudinary.config({
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_SECRET,
        });

        const { resources } = await cloudinary.api.resources_by_asset_folder(
          `airshow/shows/${getSlug(show)}`,
          { transformation: 'f_jpg,w_8,q_70' }
        );

        return res.json(
          resources.sort((a, b) => {
            if (a.public_id === show.imagePublicId) {
              return -1;
            } else if (
              a.metadata.status === 'published' &&
              b.metadata.status !== 'published'
            ) {
              return -1;
            }

            return 1;
          })
        );
      } catch (e) {
        return res.json([]);
      }
    }
    case 'POST': {
      const request = JSON.parse(body);

      const updatedShow = await ontour.show.update({
        where: {
          id: showId,
        },
        data: {
          imagePublicId: request.imagePublicId,
        },
      });
      res.json(updatedShow);
    }
    case 'PUT': {
      const request = JSON.parse(body);

      const response = await cloudinary.uploader.explicit(
        request.imagePublicId,
        {
          type: 'upload',
          metadata: {
            status: request.status,
          },
        }
      );

      res.json(response);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
