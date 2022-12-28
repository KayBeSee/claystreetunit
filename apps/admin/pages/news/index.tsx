import Link from 'next/link';

import { client } from 'middleware/database';

import { config } from 'data';

import {
  CalendarIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { PageWidthWrapper } from 'components';

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

const News = ({ data = [] }: Props) => {
  const posts = data;
  return (
    <PageWidthWrapper>
      <div>
        <div className="py-8 flex justify-between">
          <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            News
          </h1>
          <Link href="/news/add">
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
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post._id}>
                <a href={`news/${post._id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-sicard-blue-600 truncate">
                            {post.title}
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Posted on{' '}
                              <time dateTime={getDate(post.datetime)}>
                                {getDate(post.datetime)}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageWidthWrapper>
  );
};

export async function getServerSideProps(context) {
  await client.connect();
  const items = await client
    .db(config.dbName)
    .collection('news')
    .find()
    .sort({ datetime: -1 })
    .toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(items)),
      config,
    },
  };
}

News.auth = true;
export default News;
