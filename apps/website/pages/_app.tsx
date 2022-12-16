import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { ogImage } from 'utils/ogImage';
import '../styles/globals.css';

import { PageWithMenu, CornerRibbon } from 'components';
import { DataConfig } from 'types';

import * as ga from 'utils/gtag';

interface Props {
  Component: NextComponentType;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: Props) {
  const { config }: { config: DataConfig } = pageProps;
  const latestReleaseTitle = Object.values(config.music.items)[0];

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV === 'production') {
        ga.pageview(url);
      }
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsCode}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.analytics.googleAnalyticsCode}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
