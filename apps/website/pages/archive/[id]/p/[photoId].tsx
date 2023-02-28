import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';
import { ontour, Prisma } from '@ontour/archive';
import { getSlug } from 'utils/getSlug';

import Carousel from 'components/Carousel';
import getBase64ImageUrl from 'utils/generateBlurPlaceholder';
import data from '@ontour/data';

const Home: NextPage = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <title>Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const showId = Array.isArray(id) ? id[0] : id;

  const show = await ontour.show.findFirst({
    where: { id: showId },
    include: {
      setlist: {
        include: {
          tracks: {
            include: {
              song: true,
            },
          },
        },
      },
      venue: true,
      audioSources: true,
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

  let reducedResults = [];
  let i = 0;
  for (let result of resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
      asset_id: result.asset_id,
    });
    i++;
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  );
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      show: { ...show, date: JSON.parse(JSON.stringify(show.date)) },
      currentPhoto: currentPhoto,
      config: data,
    },
  };
};

export async function getStaticPaths() {
  const shows = await ontour.show.findMany({
    include: {
      setlist: {
        include: {
          tracks: {
            include: {
              song: true,
            },
          },
        },
      },
      venue: true,
    },
  });

  let fullPaths = [];

  for (let j = 0; j < shows.length; j++) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const currentShow = shows[j];
    try {
      const { resources } = await cloudinary.api.resources_by_asset_folder(
        `airshow/shows/${getSlug(currentShow)}`,
        { transformation: 'f_jpg,w_8,q_70' }
      );

      for (let i = 0; i < resources.length; i++) {
        fullPaths.push({
          params: { photoId: i.toString(), id: currentShow.id },
        });
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }

  return {
    paths: fullPaths,
    fallback: false,
  };
}
