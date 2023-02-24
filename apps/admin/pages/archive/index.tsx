import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { getShows, ShowWithSetlist } from '@ontour/archive';

import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import { data } from '@ontour/data';

interface Props {
  shows: ShowWithSetlist[];
}

const Archive = ({ shows }: Props) => {
  return (
    <div>
      <div className="flex flex-col max-w-3xl mx-auto py-6">
        <div className="flex justify-between py-8">
          <h1>Shows</h1>
          <Link href="/archive/new">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-sicard-blue-600 hover:bg-sicard-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-blue-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Add new
            </button>
          </Link>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-2xl">
          <ul role="list" className="divide-y divide-gray-200">
            {shows.map((show) => (
              <li
                key={show.id}
                className="block hover:bg-gray-100 cursor-pointer"
              >
                <Link href={`/archive/${show.id}`}>
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between items-center flex">
                      <div className="truncate">
                        <div className="flex flex-col">
                          <time className="font-sans text-sm text-slate-600">
                            {format(new Date(show.date), 'LLLL d, yyyy')}
                          </time>
                          <span className="text-xl font-serif text-slate-700">
                            {show.venue.name}
                          </span>
                          <span className="font-sans text-sm text-slate-700">
                            {show.venue.city}, {show.venue.state}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex -space-x-1 overflow-hidden"></div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const retrievedShows = await getShows();
  return {
    props: {
      shows: JSON.parse(JSON.stringify(retrievedShows)),
      config: data,
    },
  };
}

Archive.auth = true;
export default Archive;
