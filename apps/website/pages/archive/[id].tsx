import React from 'react';
import Link from 'next/link';
import {
  PageWithSidebar,
  SetlistView,
  AttendanceSelect,
  ContributeDropdown,
} from 'components';
import { data } from 'data';
import { client } from 'middleware/database';
import { ontour } from '@ontour/archive';
import { format } from 'date-fns';
import Image from 'next/image';

import {
  AppleMusic,
  AmazonMusic,
  Spotify,
  YoutubeMusic,
} from 'components/logos';
import { CheckIcon } from '@heroicons/react/solid';

const streamingProviders = {
  apple: AppleMusic,
  amazon: AmazonMusic,
  spotify: Spotify,
  youtube: YoutubeMusic,
};

const ArchiveItem = ({ data: show, config }) => {
  console.log('data: ', data);
  console.log('config.music.items.shimmer: ', config.music.items.shimmer);
  return (
    <>
      <div className="flex px-4 pb-10 lg:px-8">
        <Link href="/archive">
          <a className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
            <svg
              viewBox="0 -9 3 24"
              className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="text-white divide-y divide-slate-200">
          <div className="flex flex-col sm:flex-row md:items-center justify-between">
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
            <div className="relative col-span-3 lg:col-span-1">
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
              {Object.keys(config.music.items.shimmer.streamingLinks).map(
                (service) => {
                  const StreamLogo = streamingProviders[service];

                  return (
                    <a
                      // href={config.music[0].streamingLinks[service]}
                      target="_blank"
                      className="flex items-center justify-center w-40 h-16 md:w-28 md:h-12 relative"
                      key={service}
                    >
                      <StreamLogo
                        className={`w-40 h-16 md:w-28 md:h-12 fill-slate-600 hover:fill-slate-800 hover:scale-110 transition duration-300 cursor-pointer`}
                      />
                    </a>
                  );
                }
              )}
            </div>
          </div>
          <div className="py-16">
            <div className="flex flex-col sm:flex-row md:items-center justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Photos
              </h2>
              <ContributeDropdown />
            </div>
            <section className="mt-8 pb-16">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {Array.from(Array(10).keys()).map((item) => (
                  <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                    <Image
                      className="group-hover:opacity-75 object-cover pointer-events-none"
                      src="/page-backgrounds/info.jpg"
                      layout="fill"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for IMG_5214.HEIC
                      </span>
                    </button>
                  </div>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

ArchiveItem.getLayout = function getLayout(page: React.ReactElement) {
  console.log('page: ', page);
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
  console.log('items: ', items);
  console.log('formattedIds: ', formattedIds);

  return {
    paths: formattedIds,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  await client.connect();
  const items = await ontour.show.findFirst({
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
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(items)),
      config: data,
    },
  };
}

export default ArchiveItem;
