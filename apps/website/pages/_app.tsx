import React from 'react';
import { NextComponentType } from 'next';
import Head from 'next/head';
import { ogImage } from 'utils/ogImage';
import '../styles/globals.css';

import { PageWithMenu, CornerRibbon } from 'components';
import { DataConfig } from 'types';

interface Props {
  Component: NextComponentType;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: Props) {
  const { config }: { config: DataConfig } = pageProps;
  const latestReleaseTitle = Object.values(config.music.items)[0];
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:image"
          content={ogImage(config.home.ogImage)}
          key="og:image"
        />
      </Head>
      <PageWithMenu config={config}>
        <div className="overflow-y-scroll bg-sicard-blue-800 h-full">
          <CornerRibbon
            link={`/music/${latestReleaseTitle.slug}`}
            className="bg-gradient-to-r from-sicard-gold-500 to-sicard-gold-700 text-xs"
          >
            Listen to "{latestReleaseTitle.name}"
          </CornerRibbon>
          <Component {...pageProps} />
        </div>
      </PageWithMenu>
    </>
  );
}
