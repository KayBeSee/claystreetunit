import React from 'react';

import { data } from '@ontour/data';

import { Title, Description } from 'utils/Meta';
import { DataConfig } from '@ontour/types';

// This is a placeholder file and has a redirect in next.config.js

interface Props {
  config: DataConfig;
}

export default function Music({ config }: Props) {
  return (
    <>
      <Title>Music</Title>
      <Description>{`Music page for ${config.artistName}`}</Description>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      config: data,
    },
  };
}
