import React from 'react';
import Link from 'next/link';
import { PageWithSidebar } from 'components';
import { SetlistView } from '@ontour/components';
import { ontour, Prisma } from '@ontour/archive';

import { data } from '@ontour/data';
import { client } from 'middleware/database';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { DataConfig } from 'types';
import { getImageUrlFromPublicId } from 'utils/getImageUrlFromPublicId';

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
    <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-8">
      <div className="">
        <h1 className="text-black font-semibold text-3xl py-8 font-serif">
          Latest from the road...
        </h1>
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
                    Listen to the show, view photos, and more
                    <ChevronRightIcon className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-100" />
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
