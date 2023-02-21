import React from 'react';
import Link from 'next/link';

import { data } from '@ontour/data';
import { DataConfig } from '@ontour/types';

interface Props {
  config: DataConfig;
}

export default function Custom404({ config }: Props) {
  return (
    <>
      <main
        className="min-h-full bg-cover bg-top sm:bg-top h-screen bg-opacity-50 flex items-center"
        style={{
          backgroundImage: `url(${config.error.style.background})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48 bg-white rounded-2xl opacity-95">
          <p className="text-base font-semibold text-black text-opacity-50">
            404
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Uh oh! Looks like you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like the page you’re looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link
              href={config.websiteUrl}
              className="inline-flex items-center rounded-md border border-transparent bg-slate-900 bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
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
