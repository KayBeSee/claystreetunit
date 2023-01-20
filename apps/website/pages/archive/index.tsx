import React from 'react';
import Link from 'next/link';
import { PageWithSidebar, SetlistView } from 'components';
import { data } from 'data';
import { client } from 'middleware/database';
import { ontour } from '@ontour/archive';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/solid';

const Archive = ({ data, ...rest }) => {
  console.log('data: ', data);
  console.log('rest: ', rest);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="">
        <h1 className="text-black font-semibold text-3xl py-8 font-serif">
          Latest from the road...
        </h1>
        <ul className="space-y-8">
          {data.map((show) => (
            <li className="py-10 grid grid-cols-1 gap-8 lg:grid-cols-3 group relative rounded-3xl bg-slate-50 p-6 dark:bg-slate-800/80 dark:highlight-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/50">
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
              <div className="relative col-span-3 lg:col-span-1 flex items-center">
                <div className="aspect-w-1 aspect-h-1 mx-auto block w-full h-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl lg:rounded-3xl">
                  <Image
                    className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-3xl object-cover"
                    src="/page-backgrounds/info.jpg"
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
  console.log('page: ', page);
  return (
    <PageWithSidebar>
      {/* <NestedLayout>{page}</NestedLayout> */}
      {page}
    </PageWithSidebar>
  );
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
