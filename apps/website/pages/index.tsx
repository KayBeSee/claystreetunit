import React from 'react';
import Head from 'next/head';

import { Description } from 'utils/Meta';

import { data } from '@ontour/data';

import { SplashPage } from 'components';
import { DataConfig } from '@ontour/types';

interface Props {
  config: DataConfig;
}

export default function Home({ config }: Props) {
  return (
    <div>
      <Head>
        <title key="title">{config.artistName}</title>
      </Head>
      <Description>{`${config.artistName} is ${config.artistDescription}`}</Description>
      <div>
        <SplashPage config={config} setIsOpen={() => {}} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      config: data,
    },
  };
}
