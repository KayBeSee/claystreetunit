import React from 'react';
import Image from 'next/image';
import { ontour, Prisma } from '@ontour/archive';

import data from 'data';
import { format } from 'date-fns';
import Link from 'next/link';

type ShowWithVenue = Prisma.ShowGetPayload<{
  include: {
    venue: true;
  };
}>;

interface Props {
  data: ShowWithVenue;
}

const ThankYou = ({ data: show }: Props) => {
  return (
    <div className="overflow-y-auto h-screen">
      <div className="w-full h-60 relative flex flex-col justify-end items-start">
        <Image
          src="/page-backgrounds/info.jpg"
          className="absolute inset-0 brightness-50 object-cover object-center md:object-bottom"
          layout="fill"
        />
        <div className="flex flex-col z-[1] px-4 py-6 max-w-7xl w-full mx-auto">
          <Link href={`/archive/${show.id}`} className="z-[1] md:-mx-4 py-6">
            <a className="group flex font-semibold text-sm leading-6 text-slate-200 hover:text-slate-100">
              <svg
                viewBox="0 -9 3 24"
                className="overflow-visible mr-3 text-slate-300 w-auto h-6 group-hover:text-slate-100"
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
              Back to setlists
            </a>
          </Link>
          <time className="font-sans text-sm text-slate-100">
            {format(new Date(show.date), 'MMMM d, y')}
          </time>
          <span className="text-3xl font-serif text-slate-100">
            {show.venue.city}, {show.venue.state}
          </span>
          <span className="font-sans text-lg text-slate-100">
            {show.venue.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col z-10 px-4 py-6 max-w-7xl w-full mx-auto">
        Thaaaaanks!
      </div>
    </div>
  );
};

ThankYou.getLayout = function getLayout(page: React.ReactElement) {
  return page;
  // <PageWithSidebar>
  // <NestedLayout>{page}</NestedLayout>
  // {page}
  // </PageWithSidebar>
};

export async function getStaticPaths() {
  const items = await ontour.show.findMany({ select: { id: true } });
  const formattedIds = items.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return {
    paths: formattedIds,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const show = await ontour.show.findFirst({
    where: { id },
    include: {
      venue: true,
    },
  });

  return {
    props: {
      data: { ...show, date: JSON.parse(JSON.stringify(show.date)) },
      config: data,
    },
  };
}

export default ThankYou;
