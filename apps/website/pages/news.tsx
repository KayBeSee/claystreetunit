import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { client } from 'middleware/database';

import { Title, Description } from 'utils/Meta';

import { data } from '@ontour/data';

import { Copyright } from 'components';
import { DataConfig } from '@ontour/types';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  author: {
    name: string;
    imageUrl: string;
    href: string;
  };
  datetime: string;
}

interface Props {
  config: DataConfig;
  data: NewsItem[];
}

const getDate = (date) => {
  const dateObj = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format(
    dateObj
  );
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    dateObj
  );
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    dateObj
  );
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
    dateObj
  );
  return `${month}/${day}/${year}`;
};

export default function News({ data, config }: Props) {
  const posts = data;
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState('Notify me');

  const tryApi = async () => {
    try {
      setButtonText('Adding...');
      await axios.post(`/api/mailing-list`, {
        email: email,
      });
      setButtonText('Added!');
    } catch (e) {
      setButtonText('Try again');
    }
  };

  return (
    <div>
      <Title>{config.news.og.title}</Title>
      <Description>{config.news.og.description}</Description>

      <div
        className="bg-fixed overflow-y-scroll bg-no-repeat bg-cover bg-center h-screen w-screen relative pt-16 pb-20 px-0 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
        style={{ backgroundImage: `url(${config.news.style.backgroundImage})` }}
      >
        <div className="relative max-w-7xl mx-auto flex flex-col bg-white/95 bg-opacity- rounded-lg shadow-lg overflow-hidden pt-10 pb-8 px-4 sm:px-6 lg:pb-8 lg:px-8">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              {config.artistName} News
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl text-gray-500">
                Be the first to know about upcoming shows and releases.
              </p>
              <form
                className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  tryApi();
                }}
              >
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-sicard-gold-500 focus:border-sicard-gold-500 lg:max-w-xs"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                  <button
                    type="button"
                    className="w-full bg-sicard-gold-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-sicard-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-gold-500 sm:w-auto sm:inline-flex"
                  >
                    {buttonText}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                className="flex flex-col rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 overflow-hidden"
              >
                <div className="flex-shrink-0 relative h-48 w-full">
                  <Image
                    className="object-cover"
                    src={post.imageUrl}
                    alt=""
                    layout="fill"
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div>
                        <span className="sr-only">{post.author.name}</span>
                        <Image
                          className="h-10 w-10 rounded-full bg-black"
                          src={post.author.imageUrl}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={getDate(post.datetime)}>
                          {getDate(post.datetime)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <Copyright
            legalEntity={config.legalEntity}
            textColor="text-slate-600"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await client.connect();
  const items = await client
    .db(data.news.dbName)
    .collection('news')
    .find()
    .sort({ datetime: -1 })
    .toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(items)),
      config: data,
    },
  };
}
