import React from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import { config } from 'data';

import { ontour, ShowWithSetlist } from '@ontour/archive';
import { StreamLogo } from '@ontour/components';

import { PageWidthWrapper, LoadingSpinner } from 'components';
import { SetlistView } from '@ontour/components';
import { fetcher } from 'lib/fetcher';
import Link from 'next/link';

const EditArchivePage = () => {
  const { query } = useRouter();
  const { data: showData, error: showError } = fetcher<ShowWithSetlist>(
    `/api/shows/${query.id}`
  );

  if (showError) {
    console.log('showError: ', showError);
    return (
      <div className="h-screen flex items-center justify-center">
        Oops, something went wrong
      </div>
    );
  }

  if (!showData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageWidthWrapper className="bg-slate-50">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pt-8 pb-24">
        <div className="flex flex-col">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 w-full">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl mt-1">{showData.venue.name}</h2>
              <time
                dateTime={format(new Date(showData.date), 'utc')}
                className="order-first text-sm text-slate-500"
              >
                {format(new Date(showData.date), 'EEEE')}{' '}
                {new Date(showData.date).getMonth()}/
                {new Date(showData.date).getDay()}/
                {new Date(showData.date).getFullYear()}
              </time>
              <p className="mt-0 text-slate-500">
                {showData.venue.city}, {showData.venue.state}
              </p>
            </div>
            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <Link
                href={`./${query.id}/edit`}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                Edit setlist
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-0 sm:px-2 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-4 w-full">
            <div className="max-w-prose">
              <div className="mt-8 w-full">
                <SetlistView show={showData} />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:flex-col md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 w-full">
            <div className="flex w-full justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
                Listen on...
              </h2>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <Link
                  href={`./${query.id}/audio`}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Edit audio
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full py-8">
              {showData.audioSources.map((source) => (
                <StreamLogo source={source} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWidthWrapper>
  );
};

export async function getStaticPaths() {
  const shows = await ontour.show.findMany();
  const formattedSlugs = shows.map((show) => ({
    params: {
      id: show.id,
    },
  }));

  return {
    paths: formattedSlugs,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      config,
    },
  };
}

EditArchivePage.auth = true;

export default EditArchivePage;
