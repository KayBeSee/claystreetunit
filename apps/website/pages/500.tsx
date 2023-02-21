import React from 'react';

import { data } from '@ontour/data';
import { DataConfig } from '@ontour/types';
import Link from 'next/link';

interface Props {
  config: DataConfig;
}

export default function Custom500({ config }: Props) {
  return (
    <>
      <main
        className="min-h-full bg-cover bg-top sm:bg-top  h-screen"
        style={{
          backgroundImage: `url(${config.error.style.background})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <p className="text-base font-semibold text-black text-opacity-50">
            404
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Uh oh! Something went wrong.
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            Please return home and notify the website owner if this error
            persists.
          </p>
          <div className="mt-6">
            <Link
              href={config.websiteUrl}
              className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
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
