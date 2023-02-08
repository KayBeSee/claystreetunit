import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  PageWithSidebar,
  AttendanceSelect,
  ContributeDropdown,
} from 'components';
import { data } from 'data';
import { client } from 'middleware/database';
import { ontour, Prisma } from '@ontour/archive';
import {
  Photo,
  PhotoEmptyState,
  SetlistView,
  StreamLogo,
} from '@ontour/components';
import { format } from 'date-fns';
import Image from 'next/image';

import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';

import { useAppContext } from 'context/state';
import { getSlug } from 'utils/getSlug';

const REPLACE_ZERO = 0;

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
}

const ArchiveItem = ({ show, photos }: Props) => {
  const { state, setState } = useAppContext();
  const router = useRouter();

  return (
    <div className="overflow-y-auto h-screen bg-gray-50">
      <div className="px-4 pb-10 pt-10 lg:px-8 z-10 hidden md:block">
        <Link href="/archive">
          <a className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900">
            <svg
              viewBox="0 -9 3 24"
              className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600"
            >
              <path
                d="M3 0L0 3L3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to setlists
          </a>
        </Link>
      </div>
      <div className="w-full h-56 relative flex flex-col md:hidden justify-end">
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom"
          layout="fill"
        />
        <div className="flex px-4 py-2 lg:px-8 z-10 items-end">
          <Link href="/archive">
            <a className="group flex font-semibold text-sm leading-6 text-slate-100 hover:text-slate-200">
              <svg
                viewBox="0 -9 3 24"
                className="overflow-visible mr-3 text-slate-100 w-auto h-6 group-hover:text-slate-200"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to setlists
            </a>
          </Link>
        </div>
        <div className="flex flex-col z-10 px-4 py-6 max-w-7xl mx-auto w-full justify-end md:hidden">
          <time className="font-sans text-sm text-slate-100">
            {format(new Date(show.date), 'MMMM d, y')}
          </time>
          <span className="text-3xl font-serif text-slate-100">
            {show.venue.name}
          </span>
          <span className="font-sans text-lg text-slate-100">
            {show.venue.city}, {show.venue.state}
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 z-10">
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
          <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col flex-1 flex-wrap mb-4 col-span-3 lg:col-span-2 pr-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700 mb-4">
                Setlist
              </h2>

              <SetlistView show={show} />
            </div>
            <div className="md:hidden flex flex-col">
              <AttendanceSelect />
            </div>
            <div className="relative col-span-3 lg:col-span-1 hidden md:block">
              <div className="aspect-w-1 aspect-h-1 mx-auto block w-full h-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl lg:rounded-2xl">
                <Image
                  className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl object-cover"
                  src="/page-backgrounds/info.jpg"
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="py-16 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
              Listen on...
            </h2>
            <div className="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 items-center justify-center flex flex-col">
              {show.audioSources.map((source) => (
                <StreamLogo source={source} />
              ))}
            </div>
          </div>
          <div className="py-16">
            <div className="flex flex-col sm:flex-row md:items-center justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Photos
              </h2>
              {REPLACE_ZERO === 0 ? null : <ContributeDropdown />}
            </div>
            <section className="mt-8 pb-16">
              <PhotoEmptyState
                show={show}
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
                  {photos.map((photo) => {
                    return <Photo src={photo.secure_url} />;
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

ArchiveItem.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PageWithSidebar>
      {/* <NestedLayout>{page}</NestedLayout> */}
      {page}
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
  let photos = [];
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
    photos = resources;
  } catch (e) {
    console.log('e: ', e);
  }

  return {
    props: {
      show: JSON.parse(JSON.stringify(show)),
      config: data,
      photos: photos,
    },
  };
}

export default ArchiveItem;
