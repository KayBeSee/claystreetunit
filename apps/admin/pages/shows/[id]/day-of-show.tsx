import fetch from 'isomorphic-unfetch';

import { PageWidthWrapper, LoadingSpinner } from 'components';
import { useRouter } from 'next/router';
import { shows } from 'data';

import { Header, Tabs } from 'components/shows';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const otherData = {};

const Venue = () => {
  const { query } = useRouter();
  const data = shows.filter((item) => item._id === Number(query.id))[0];

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageWidthWrapper>
      <main className="py-10">
        <Header show={data} />
        <Tabs />
      </main>
    </PageWidthWrapper>
  );
};

Venue.auth = true;

export default Venue;
