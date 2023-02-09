import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { format } from 'date-fns';
import { Prisma } from '@ontour/archive';
import clsx from 'clsx';

type ShowWithVenue = Prisma.ShowGetPayload<{
  include: {
    venue: true;
  };
}>;

interface Props {
  children: React.ReactElement;
  show: ShowWithVenue;
  navBackOptions?: {
    text: string;
    href: string;
  };
  alwaysShowImage?: boolean;
}

export function ShowArchiveWrapper({
  children,
  show,
  navBackOptions,
  alwaysShowImage = false,
}: Props) {
  return (
    <div className="overflow-y-auto h-screen bg-gray-50">
      <div
        className={clsx(
          alwaysShowImage ? '' : 'md:block',
          'px-4 pb-10 pt-10 lg:px-8 hidden'
        )}
      >
        {navBackOptions ? (
          <Link href={navBackOptions.href}>
            <a className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900">
              <svg
                viewBox="0 -9 3 24"
                className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {navBackOptions.text}
            </a>
          </Link>
        ) : null}
      </div>
      <div
        className={clsx(
          alwaysShowImage ? '' : 'md:hidden',
          'w-full h-56 relative flex flex-col justify-end z-0'
        )}
      >
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom"
          layout="fill"
        />
        {navBackOptions ? (
          <div className="flex px-4 py-2 lg:px-8 z-[1] items-end">
            <Link href={navBackOptions.href}>
              <a className="group flex font-semibold text-sm leading-6 text-slate-100 hover:text-slate-200">
                <svg
                  viewBox="0 -9 3 24"
                  className="overflow-visible mr-3 text-slate-100 w-auto h-6 group-hover:text-slate-200"
                >
                  <path
                    d="M3 0L0 3L3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {navBackOptions.text}
              </a>
            </Link>
          </div>
        ) : null}
        <div
          className={clsx(
            alwaysShowImage ? '' : 'md:hidden',
            'flex flex-col z-[1] px-4 py-6 max-w-7xl mx-auto w-full justify-end'
          )}
        >
          <time className="font-sans text-sm text-slate-100">
            {format(new Date(show.date), 'MMMM d, y')}
          </time>
          <span className="text-3xl font-serif text-slate-100">
            {show.venue.name}
          </span>
          <span className="font-sans text-lg text-slate-100">
            {show.venue.city}, {show.venue.state}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
