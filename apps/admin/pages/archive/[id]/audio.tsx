import React from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import { config } from 'data';

import {
  ontour,
  CreateShowFormInput,
  DecoratedAudioSource,
} from '@ontour/archive';

import { PageWidthWrapper, LoadingSpinner } from 'components';
import { createAudioSource } from 'components/AudioForm/util';
import { fetcher } from 'lib/fetcher';

import { Suggestions } from 'components/AudioForm/Suggestions';
import { StreamItem } from 'components/AudioForm/StreamItem';
import { AddSourceForm } from 'components/AudioForm/AddSourceForm';

const AudioPage = () => {
  const { query } = useRouter();
  const { data: showData, error: showError } = fetcher<CreateShowFormInput>(
    `/api/shows/${query.id}`
  );
  const {
    data: audioData,
    mutate,
    error: audioError,
  } = fetcher<DecoratedAudioSource[]>(`/api/shows/${query.id}/audio`);

  if (showError || audioError) {
    return (
      <div className="h-screen flex items-center justify-center">
        Oops, something went wrong
      </div>
    );
  }

  if (!showData || !audioData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const addAudioSource = async (item: {
    provider: string;
    identifier: string;
  }) => {
    if (!!!item.identifier.length) {
      throw new Error('Unable to parse url');
    }

    const audioSource = await createAudioSource({
      identifier: item.identifier,
      provider: item.provider,
      showId: query.id,
    });
    mutate([...audioData, audioSource]);
  };

  const deleteAudioSource = (id: string) => {
    const filteredAudioSources = audioData.filter((item) => item.id !== id);
    mutate(filteredAudioSources);
  };

  return (
    <PageWidthWrapper className="bg-slate-100">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pb-24">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between items-center flex">
          <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
            <div className="flex -space-x-1 overflow-hidden"></div>
          </div>
        </div>
        <h1 className="text-black font-semibold text-3xl py-8 font-serif border-b border-gray-200">
          <p className="font-serif text-md sm:text-xl font-semibold tracking-tight text-slate-500">
            {format(new Date(showData.date), 'MMMM d, y')}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {showData.venue.name}
          </h2>
          <p className="mt-1 font-serif text-xl sm:text-xl font-semibold tracking-tight text-slate-500">
            {showData.venue.city}, {showData.venue.state}
          </p>
        </h1>
        <div className="md:grid md:grid-cols-5 md:gap-20">
          <div className="md:col-span-2">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Streaming information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Fill in information to link streaming versions of this show to
                the archive.
              </p>
            </div>
            <AddSourceForm onSubmit={addAudioSource} />
            <div className="mt-5 md:col-span-3 md:mt-0 md:col-start-3">
              <Suggestions date={showData.date} onAdd={addAudioSource} />
            </div>
          </div>
          <div className="mt-5 md:col-span-3 md:mt-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Linked sources
            </h3>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm w-full">
              <ul role="list" className="divide-y divide-gray-200">
                {audioData.map((audio) => (
                  <StreamItem {...audio} onDelete={deleteAudioSource} />
                ))}
              </ul>
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

AudioPage.auth = true;

export default AudioPage;
