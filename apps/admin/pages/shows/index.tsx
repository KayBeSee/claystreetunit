import Link from 'next/link';

import { client } from 'middleware/database';

import {
  CalendarIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { PageWidthWrapper } from 'components';

import { shows } from 'data';

const getDate = (date) => {
  const dateObj = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    dateObj
  );
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    dateObj
  );
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    dateObj
  );
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    dateObj
  );
  return `${weekday} ${month} ${day}, ${year}`;
};

// TODO: make types directory
interface Props {
  data: any;
}

const Shows = () => {
  return (
    <PageWidthWrapper>
      <div>
        <div className="py-8 flex justify-between">
          <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Shows
          </h1>
          <Link href="/shows/add">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-sicard-blue-600 hover:bg-sicard-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-blue-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Add new
            </button>
          </Link>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Venue
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Event
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {shows.map((show) => (
                <tr key={show._id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {show.date}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Location</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {show.venue.city}, {show.venue.state}
                      </dd>
                      <dt className="sr-only sm:hidden">Event Name</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {show.name}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {show.venue.city}, {show.venue.state}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {show.venue.name}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {show.name}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a
                      href={`/shows/${show._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {show.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWidthWrapper>
  );
};

export async function getServerSideProps(context) {
  await client.connect();
  const items = await client
    .db('sicard')
    .collection('shows')
    .find()
    .sort({ datetime: -1 })
    .toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(items)),
    },
  };
}

Shows.auth = true;
export default Shows;
