import React from 'react';
import Image from 'next/image';
import { ontour, Prisma } from '@ontour/archive';

import data from 'data';
import { format } from 'date-fns';
import Link from 'next/link';
import { ShowArchiveWrapper } from 'components';

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
    <div className="flex flex-col z-10 px-4 py-6 max-w-7xl w-full mx-auto">
      <div className="flex flex-col items-center justify-center border-2 rounded-3xl max-w-md mx-auto w-full py-6 px-6 text-center">
        <div className="h-24 w-24 flex items-center">
          <svg
            className="checkmark bg-emerald-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle stroke-green-500"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />{' '}
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold pb-2">Thank you!</h2>
        <p className="text-slate-500 text-sm">
          Thank you for submitting photos. The band will review them soon and
          publish them on the show page.
        </p>

        <Link
          href={`/archive/${show.id}`}
          className="cursor-pointer group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sicard-blue-100 text-white hover:bg-sicard-blue-200 hover:text-slate-100 focus:ring-sicard-blue-300 mt-8"
        >
          Return to show
        </Link>
      </div>
    </div>
  );
};

ThankYou.getLayout = function getLayout(page: React.ReactElement) {
  const { data, config } = page.props;
  return (
    <ShowArchiveWrapper config={config} show={data} alwaysShowImage={true}>
      {page}
    </ShowArchiveWrapper>
  );
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
