import React from 'react';
import { NextComponentType } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

import { Auth, Navbar } from 'components';

import { SessionProvider, getSession } from 'next-auth/react';

import '../styles/globals.css';

type CustomComponentType = NextComponentType & {
  auth: boolean;
};

interface Props {
  Component: CustomComponentType;
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

function MyApp({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={pageProps.session}>
        {Component.auth ? (
          <Auth>
            <Navbar {...pageProps} />
            {/* <Layout> */}
            {/* <main className="flex-1">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"> */}
            <Component {...pageProps} />
            {/* </div>
              </div>
            </main> */}
            {/* </Layout> */}
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;
