import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import { config } from 'data';

import { ontour, CreateShowFormInput } from '@ontour/archive';
import { LoadingSpinner } from '@ontour/components';

import { PageWidthWrapper, SetlistForm } from 'components';
import { fetcher } from 'lib/fetcher';

const EditArchivePage = () => {
  const { query, push } = useRouter();
  const { data: showData, error: showError } = fetcher<CreateShowFormInput>(
    `/api/shows/${query.id}`
  );

  const updateShow = async (show: CreateShowFormInput) => {
    const response = await fetch(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_APP_URL}/api/shows/${show.id}`,
      {
        method: 'put',
        body: JSON.stringify(show),
      }
    );
    push(`/archive/${query.id}`);
  };

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
    <PageWidthWrapper className="bg-slate-100">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pt-8 pb-24">
        <SetlistForm show={showData} onSubmit={updateShow} />
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
