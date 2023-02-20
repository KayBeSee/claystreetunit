import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getShows, CreateShowFormInput } from '@ontour/archive';
import { config } from 'data';
import useSWR from 'swr';

import { PageWidthWrapper, SetlistForm } from 'components';

export const EMPTY_SHOW: CreateShowFormInput = {
  eventName: '',
  date: '',
  notes: '',
  venue: {
    name: '',
    city: '',
    state: '',
  },
  setlist: [],
};

const NewShow = () => {
  const router = useRouter();

  const addShow = async (show: CreateShowFormInput) => {
    try {
      const response = await fetch(`/api/shows`, {
        method: 'post',
        body: JSON.stringify(show),
      });
      router.push('/archive');
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <PageWidthWrapper className="bg-slate-100">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 pt-8 pb-24">
        <SetlistForm show={EMPTY_SHOW} onSubmit={addShow} />
      </div>
    </PageWidthWrapper>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      config,
    },
  };
}

NewShow.auth = true;
export default NewShow;
