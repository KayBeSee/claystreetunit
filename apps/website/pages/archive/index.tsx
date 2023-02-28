import React from 'react';
import Link from 'next/link';
import { PageWithSidebar } from 'components';
import { SetlistView } from '@ontour/components';
import { ontour, Prisma } from '@ontour/archive';

import { data } from '@ontour/data';
import { client } from 'middleware/database';
import { format } from 'date-fns';
import Image from 'next/image';
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid';
import { DataConfig } from '@ontour/types';
import { getImageUrlFromPublicId } from 'utils/getImageUrlFromPublicId';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

const IconMap = {
  SetlistsIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6 p-1 stroke-blue-600"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  ),

  SongsIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6 p-1 stroke-violet-500"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
      />
    </svg>
  ),

  VideosIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6 p-1 stroke-rose-500"
    >
      <path
        stroke-linecap="round"
        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
};

interface Props {
  data: Prisma.ShowGetPayload<{
    include: {
      setlist: {
        include: {
          tracks: { include: { song: { select: { id: true; name: true } } } };
        };
      };
      venue: true;
      audioSources: true;
    };
  }>[];
  config: DataConfig;
}

const Archive = ({ data, config }: Props) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-8 bg-white">
      <div className="pt-12 md:pt-0">
        <h1 className="text-black font-semibold text-3xl py-4 md:py-8 font-serif px-4 md:px-0">
          Latest from the road...
        </h1>
        <ul className="mt-1 pt-2 pb-8 space-x-4 md:hidden flex items-center overflow-x-auto px-4">
          {config.archive.navigation.map((item) => (
            <Link
              href={item.href}
              className="group flex items-center lg:text-lg lg:leading-6 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <div className="mr-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600 dark:bg-slate-800 dark:highlight-white/5">
                {IconMap[`${item.name}Icon`]}
              </div>
              {item.name}
              {item.comingSoon ? (
                <span className="rotate-[5deg] inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 -translate-y-2">
                  Soon
                </span>
              ) : null}
            </Link>
          ))}
        </ul>
        <ul className="space-y-8">
          {data.map((show) => (
            <li className="py-6 px-4 md:px-7 grid grid-cols-1 gap-8 lg:grid-cols-3 group relative rounded-3xl bg-slate-50 hover:bg-slate-100 border border-slate-900/10">
              <div className="flex flex-col flex-1 flex-wrap mb-4 col-span-3 lg:col-span-2">
                <p className="mb-2 text-sm leading-6 font-semibold text-sicard-blue-400">
                  Setlist
                </p>
                <div className="space-y-1">
                  <p className="font-serif text-md sm:text-xl font-semibold tracking-tight text-slate-500">
                    {format(new Date(show.date), 'MMMM d, y')}
                  </p>
                  <div>
                    <Link
                      prefetch
                      href={`/archive/${show.id}`}
                      className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
                    >
                      <span className="absolute inset-0 rounded-3xl"></span>
                      {show.venue.name}
                    </Link>
                  </div>
                </div>
                <p className="mt-1 font-serif text-xl sm:text-xl font-semibold tracking-tight text-slate-500">
                  {show.venue.city}, {show.venue.state}
                </p>

                <SetlistView show={show} />
                <div className="flex flex-nowrap flex-grow mt-8 items-end">
                  <Link
                    href={`/archive/${show.id}`}
                    className="text-slate-400 group-hover:text-blue-500 font-medium flex items-center"
                  >
                    Listen, view photos, and more
                    <ArrowSmallRightIcon className="ml-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-100" />
                  </Link>
                </div>
              </div>
              <div className="relative col-span-3 lg:col-span-1 items-center hidden md:flex">
                <div className="aspect-w-1 aspect-h-1 mx-auto block w-full h-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl lg:rounded-3xl">
                  <Image
                    className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-3xl object-cover"
                    src={
                      getImageUrlFromPublicId(show.imagePublicId) ||
                      config.info.style.backgroundImage
                    }
                    layout="fill"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Archive.getLayout = function getLayout(page: React.ReactElement) {
  return <PageWithSidebar>{page}</PageWithSidebar>;
};

export async function getStaticProps(context) {
  await client.connect();
  const items = await ontour.show.findMany({
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

export default Archive;
