import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import {
  PageWithSidebar,
  AttendanceSelect,
  ShowArchiveWrapper,
} from 'components';
import { data } from '@ontour/data';
import { ontour, Prisma } from '@ontour/archive';
import {
  Photo,
  PhotoEmptyState,
  SetlistView,
  StreamLogo,
} from '@ontour/components';
import { format } from 'date-fns';
import { getImageUrlFromPublicId } from 'utils/getImageUrlFromPublicId';

import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';

import { useAppContext } from 'context/state';
import { getSlug } from 'utils/getSlug';
import getBase64ImageUrl, { ImageProps } from 'utils/generateBlurPlaceholder';
import { DataConfig } from '@ontour/types';
import Link from 'next/link';
import { useLastViewedPhoto } from 'utils/useLastViewedPhoto';
import PhotoModal from 'components/PhotoModal';

type ShowWithSetListAudio = Prisma.ShowGetPayload<{
  include: {
    setlist: {
      include: {
        tracks: {
          include: {
            song: true;
          };
        };
      };
    };
    venue: true;
    audioSources: true;
  };
}>;

interface Props {
  show: ShowWithSetListAudio;
  photos: ResourceApiResponse['resources'];
  config: DataConfig;
}

const ArchiveItem = ({ show, photos, config }: Props) => {
  const { setState } = useAppContext();
  const router = useRouter();

  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const ogObject = {
    date: show.date.toString(),
    venueName: show.venue.name,
    venueCity: show.venue.city,
    venueState: show.venue.state,
    imagePublicId: show.imagePublicId,
  };

  const queryParams = new URLSearchParams(ogObject);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <meta
          name="og:title"
          property="og:title"
          key="og:title"
          content={`${format(new Date(show.date), 'MMMM d, y')} - ${
            show.venue.name
          } - ${show.venue.city}, ${show.venue.state} - ${config.artistName}`}
        />
        <meta
          name="og:description"
          property="og:description"
          key="og:description"
          content={`Setlist, audio, photos and more from ${
            config.artistName
          }'s show on ${format(new Date(show.date), 'MMMM d, y')} at ${
            show.venue.name
          } in ${show.venue.city}, ${show.venue.state}`}
        />
        <meta
          property="og:image"
          key="og:image"
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `${
              process.env.NEXT_PUBLIC_VERCEL_URL
                ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL
                : ''
            }/api/og?${queryParams}`
          }
        />
      </Head>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 z-[1]">
        {photoId && (
          <PhotoModal
            images={photos}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="text-white divide-y divide-slate-200">
          <div className="flex-col sm:flex-row md:items-center justify-between space-y-8 hidden md:flex">
            <h1 className="text-black font-semibold text-3xl py-8 font-serif">
              <p className="font-serif text-md sm:text-xl font-semibold tracking-tight text-slate-500">
                {format(new Date(show.date), 'MMMM d, y')}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {show.venue.name}
              </h2>
              <p className="mt-1 font-serif text-xl sm:text-xl font-semibold tracking-tight text-slate-500">
                {show.venue.city}, {show.venue.state}
              </p>
            </h1>
            <AttendanceSelect />
          </div>
          <div className="md:hidden flex flex-col col-span-3 py-4">
            <AttendanceSelect />
          </div>
          <div className="py-8 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col flex-1 flex-wrap mb-4 col-span-3 lg:col-span-2 pr-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700 mb-4">
                Setlist
              </h2>

              <SetlistView show={show} />
            </div>
            <div className="relative col-span-3 lg:col-span-1 hidden md:block">
              <div className="aspect-w-1 aspect-h-1 mx-auto block w-full h-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl lg:rounded-2xl">
                <Image
                  className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl object-cover"
                  src={
                    getImageUrlFromPublicId(show.imagePublicId) ||
                    config.info.style.backgroundImage
                  }
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="py-8 md:py-16 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
              Listen on...
            </h2>
            <div className="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 items-center justify-center flex flex-col">
              {show.audioSources.map((source) => (
                <StreamLogo source={source} />
              ))}
            </div>
          </div>
          <div className="py-8 md:py-16">
            <div className="flex flex-col sm:flex-row md:items-center justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Photos
              </h2>
            </div>
            <section className="mt-8 pb-16">
              <PhotoEmptyState
                onChange={(files) => {
                  Object.keys(files).forEach((i) => {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                      const content = e.target.result;
                      setState((state) => {
                        if (state.files) {
                          return { files: [...state.files, content] };
                        } else {
                          return { files: [content] };
                        }
                      });
                    };
                    fileReader.readAsDataURL(files[i]);
                  });
                  router.push(`./${show.id}/upload`);
                }}
              />
              <div className="py-12">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {photos.map(
                    ({ id, secure_url, public_id, format, blurDataUrl }) => {
                      return (
                        <Link
                          key={id}
                          href={`/archive/${show.id}/?photoId=${id}`}
                          // href={{
                          //   pathname: '/archive/[showId]/',
                          //   query: { showId: show.id, photoId: id },
                          // }}
                          // as={`/archive/${show.id}/p/${id}`}
                          ref={
                            id === Number(lastViewedPhoto)
                              ? lastViewedPhotoRef
                              : null
                          }
                          shallow
                          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                          <Photo src={secure_url} />
                        </Link>
                      );
                    }
                  )}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

ArchiveItem.getLayout = function getLayout(page: React.ReactElement) {
  const { show, config } = page.props;
  return (
    <PageWithSidebar>
      <ShowArchiveWrapper
        config={config}
        show={show}
        navBackOptions={{ text: 'Back to setlists', href: '/archive' }}
      >
        {page}
      </ShowArchiveWrapper>
    </PageWithSidebar>
  );
};

export async function getStaticPaths() {
  const items = await ontour.show.findMany({ select: { id: true } });
  const formattedIds = items.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return {
    paths: formattedIds,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const show = await ontour.show.findFirst({
    where: { id },
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

  try {
    const { resources } = await cloudinary.api.resources_by_asset_folder(
      `airshow/shows/${getSlug(show)}`,
      { transformation: 'f_jpg,w_8,q_70' }
    );

    const filteredResources = resources.filter(
      (item) => item?.metadata?.status === 'published'
    );

    let reducedResults: ImageProps[] = [];

    let i = 0;
    for (let result of filteredResources) {
      reducedResults.push({
        id: i,
        height: result.height,
        width: result.width,
        public_id: result.public_id,
        format: result.format,
      });
      i++;
    }

    const blurImagePromises = reducedResults.map((image: ImageProps) => {
      return getBase64ImageUrl(image);
    });
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < filteredResources.length; i++) {
      filteredResources[i].id = i;
      filteredResources[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    return {
      props: {
        show: JSON.parse(JSON.stringify(show)),
        config: data,
        photos: filteredResources,
      },
    };
  } catch (e) {
    console.log('e: ', e);
  }

  return {
    props: {
      show: JSON.parse(JSON.stringify(show)),
      config: data,
      photos: [],
    },
  };
}

export default ArchiveItem;
