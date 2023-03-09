import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import ProgressBar from '@badrap/bar-of-progress';
import { SessionProvider } from 'next-auth/react';

import { ogImage } from 'utils/ogImage';
import '../styles/globals.css';

import { PageWithMenu, CornerRibbon } from 'components';
import { DataConfig } from '@ontour/types';

import * as ga from 'utils/gtag';

import { AppWrapper } from 'context/state';

interface Props {
  Component: NextComponentType;
  pageProps: any;
}

const progress = new ProgressBar({
  size: 2,
  color: '#38bdf8',
  className: 'bar-of-progress',
  delay: 100,
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.finish());
Router.events.on('routeChangeError', () => progress.finish());

export default function MyApp({ Component, pageProps }: Props) {
  const { config }: { config: DataConfig } = pageProps;
  const latestReleaseTitle = Object.values(config.music.items)[0];

  // Use the layout defined at the page level, if available
  // @ts-ignore
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  const queryParams = new URLSearchParams(
    !!config[router.asPath.slice(1)]
      ? {
          ...config[router.asPath.slice(1)].og,
        }
      : {}
  );

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
        <meta
          property="og:image"
          key="og:image"
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `${
              process.env.NEXT_PUBLIC_VERCEL_URL
                ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL
                : ''
            }/api/og?${queryParams}`
          }
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
      <SessionProvider session={pageProps.session}>
        <PageWithMenu config={config}>
          <div className="h-full">
            {!router.asPath.includes('archive') ? (
              <CornerRibbon
                link={`/music/${latestReleaseTitle.slug}`}
                className="bg-gradient-to-r from-sicard-gold-500 to-sicard-gold-700 text-xs"
              >
                Listen to "{latestReleaseTitle.name}"
              </CornerRibbon>
            ) : null}
            <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
          </div>
        </PageWithMenu>
      </SessionProvider>
    </>
  );
}
